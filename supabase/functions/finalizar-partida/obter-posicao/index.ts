import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  try {
    const { partida_id, jogador_id } = await req.json()
    if (!partida_id) throw new Error('partida_id é obrigatório')
    if (!jogador_id) throw new Error('jogador_id é obrigatório')

    // Busca a partida e verifica propriedade
    const { data: partida, error: errPartida } = await supabase
      .from('partidas')
      .select('*')
      .eq('id', partida_id)
      .single()

    if (errPartida || !partida) throw new Error('Partida não encontrada')
    if (partida.jogador_id !== jogador_id) throw new Error('Esta partida não pertence a este jogador')
    if (partida.finalizada_em) throw new Error('Partida já finalizada')
    if (partida.validada) throw new Error('Partida já validada')

    // Busca todos os eventos da partida
    const { data: eventos, error: errEventos } = await supabase
      .from('eventos_partida')
      .select('*')
      .eq('partida_id', partida_id)
      .order('ordem', { ascending: true })

    if (errEventos) throw errEventos
    if (eventos.length === 0) {
      // Partida sem eventos? Pode ser abandonada. Vamos considerar inválida.
      throw new Error('Partida sem eventos')
    }

    // --- CÁLCULO BASEADO NOS EVENTOS ---

    // 1. Acertos e Erros
    const acertos = eventos.filter(e => e.tipo === 'ACERTO').length
    const erros = eventos.filter(e => e.tipo === 'ERRO').length

    // 2. Pontuação: soma dos pontos de cada ACERTO (calculados a partir do nível da bolha)
    let pontuacao = 0
    eventos.forEach(e => {
      if (e.tipo === 'ACERTO' && e.dados && e.dados.nivel_bolha) {
        const nivel = e.dados.nivel_bolha
        if (nivel === 1) pontuacao += 1
        else if (nivel === 2) pontuacao += 2
        else if (nivel === 3) pontuacao += 3
      }
    })

    // 3. Eficiência
    const total = acertos + erros
    const eficiencia = total > 0 ? (acertos / total) * 100 : 0

    // 4. Nível máximo atingido
    let nivelMaximo = 1
    eventos.forEach(e => {
      if (e.tipo === 'NIVEL' && e.dados && e.dados.nivel) {
        if (e.dados.nivel > nivelMaximo) nivelMaximo = e.dados.nivel
      }
    })

    // 5. Duração (ms entre primeiro e último evento)
    const primeiroInstante = eventos[0].instante
    const ultimoInstante = eventos[eventos.length - 1].instante
    const duracaoSegundos = Math.floor((ultimoInstante - primeiroInstante) / 1000)

    // 6. Vitória? Se o último evento for GAME_OVER com vitoria=true
    const ultimoEvento = eventos[eventos.length - 1]
    const vitoria = ultimoEvento.tipo === 'GAME_OVER' && ultimoEvento.dados?.vitoria === true

    // 7. Validações adicionais
    // - Não pode ter mais acertos que bolhas criadas (opcional)
    const bolhasCriadas = eventos.filter(e => e.tipo === 'BOLHA_CRIADA').length
    if (acertos > bolhasCriadas) {
      throw new Error('Número de acertos excede o número de bolhas criadas')
    }

    // - Tempo mínimo razoável (ex: 1 segundo)
    if (duracaoSegundos < 1) {
      throw new Error('Partida muito curta')
    }

    // Atualiza a partida
    const { error: errUpdate } = await supabase
      .from('partidas')
      .update({
        finalizada_em: new Date().toISOString(),
        pontuacao,
        acertos,
        erros,
        eficiencia: parseFloat(eficiencia.toFixed(2)),
        nivel_maximo: nivelMaximo,
        vitoria,
        validada: true,
        duracao_segundos: duracaoSegundos
      })
      .eq('id', partida_id)

    if (errUpdate) throw errUpdate

    // --- ATUALIZA RECORDE DO JOGADOR ---
    const { data: jogador, error: errJogador } = await supabase
      .from('jogadores')
      .select('recorde, melhor_eficiencia, melhor_nivel, total_partidas')
      .eq('id', jogador_id)
      .single()

    if (errJogador) throw errJogador

    let novoRecorde = false
    let recordeAtual = jogador.recorde || 0
    if (pontuacao > recordeAtual) {
      recordeAtual = pontuacao
      novoRecorde = true
    }

    const eficienciaAtual = jogador.melhor_eficiencia || 0
    let novaMelhorEficiencia = eficienciaAtual
    if (eficiencia > eficienciaAtual) {
      novaMelhorEficiencia = eficiencia
    }

    const melhorNivelAtual = jogador.melhor_nivel || 1
    const novoMelhorNivel = Math.max(melhorNivelAtual, nivelMaximo)
    const totalPartidas = (jogador.total_partidas || 0) + 1

    const { error: errUpdateJogador } = await supabase
      .from('jogadores')
      .update({
        recorde: recordeAtual,
        melhor_eficiencia: parseFloat(novaMelhorEficiencia.toFixed(2)),
        melhor_nivel: novoMelhorNivel,
        total_partidas: totalPartidas,
        atualizado_em: new Date().toISOString()
      })
      .eq('id', jogador_id)

    if (errUpdateJogador) throw errUpdateJogador

    // Obtém posição no ranking
    const { data: posicaoData, error: errPos } = await supabase
      .rpc('obter_posicao_jogador', { p_jogador_id: jogador_id })

    const posicao = posicaoData || null

    return new Response(JSON.stringify({
      pontuacao,
      acertos,
      erros,
      eficiencia: parseFloat(eficiencia.toFixed(2)),
      nivel_maximo: nivelMaximo,
      vitoria,
      novo_recorde: novoRecorde,
      recorde_atual: recordeAtual,
      posicao_ranking: posicao,
      melhor_eficiencia: parseFloat(novaMelhorEficiencia.toFixed(2)),
      melhor_nivel: novoMelhorNivel,
      total_partidas: totalPartidas
    }), {
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ erro: error.message }), { status: 400 })
  }
})