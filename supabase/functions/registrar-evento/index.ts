import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Tipos de eventos permitidos
const TIPOS_PERMITIDOS = ['INICIO', 'BOLHA_CRIADA', 'ACERTO', 'ERRO', 'NIVEL', 'GAME_OVER']

serve(async (req) => {
  try {
    const { partida_id, ordem, tipo, instante, dados } = await req.json()

    // Validações básicas
    if (!partida_id || ordem === undefined || !tipo || instante === undefined) {
      throw new Error('Dados incompletos')
    }
    if (ordem < 0) throw new Error('Ordem inválida')
    if (instante < 0) throw new Error('Instante inválido')
    if (!TIPOS_PERMITIDOS.includes(tipo)) throw new Error('Tipo de evento inválido')

    // Busca a partida e verifica se existe e está ativa
    const { data: partida, error: errPartida } = await supabase
      .from('partidas')
      .select('id, jogador_id, finalizada_em, validada')
      .eq('id', partida_id)
      .single()

    if (errPartida || !partida) throw new Error('Partida não encontrada')
    if (partida.finalizada_em) throw new Error('Partida já finalizada')
    if (partida.validada) throw new Error('Partida já validada')

    // Verifica se o evento é para o jogador correto (já que a função é chamada com o jogador_id da sessão)
    // Na prática, vamos confiar que o cliente autenticado só pode chamar esta função para sua própria partida.
    // Para reforçar, podemos receber o jogador_id no corpo e validar.
    // Mas como o cliente pode forjar, usamos a chave de serviço e validamos no servidor:
    // Podemos adicionar um campo "jogador_id" na requisição e verificar.
    // Vou adotar que o cliente envia jogador_id também.
    const { jogador_id } = await req.json()
    if (!jogador_id) throw new Error('jogador_id não fornecido')
    if (partida.jogador_id !== jogador_id) {
      throw new Error('Esta partida não pertence a este jogador')
    }

    // Verifica se a ordem é a próxima esperada (opcional, mas bom)
    const { data: ultimoEvento, error: errUltimo } = await supabase
      .from('eventos_partida')
      .select('ordem')
      .eq('partida_id', partida_id)
      .order('ordem', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (errUltimo) throw errUltimo
    const ultimaOrdem = ultimoEvento ? ultimoEvento.ordem : -1
    if (ordem !== ultimaOrdem + 1) {
      throw new Error('Ordem fora de sequência')
    }

    // Validações específicas por tipo
    if (tipo === 'ACERTO') {
      const nivelBolha = dados?.nivel_bolha
      if (!nivelBolha || ![1, 2, 3].includes(nivelBolha)) {
        throw new Error('Nível da bolha inválido para ACERTO')
      }
      // Não aceita dados.pontos – será ignorado
    }

    if (tipo === 'ERRO') {
      // Pode aceitar dados com tamanho, etc.
    }

    if (tipo === 'NIVEL') {
      const novoNivel = dados?.nivel
      if (!novoNivel || novoNivel < 1 || novoNivel > 5) {
        throw new Error('Nível inválido')
      }
    }

    // Insere o evento
    const { error: errEvento } = await supabase
      .from('eventos_partida')
      .insert({
        partida_id,
        ordem,
        tipo,
        instante,
        dados: dados || {}
      })

    if (errEvento) throw errEvento

    return new Response(JSON.stringify({ sucesso: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ erro: error.message }), { status: 400 })
  }
})