import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(
    supabaseUrl,
    supabaseServiceKey
)

const TIPOS_PERMITIDOS = [
    'INICIO',
    'BOLHA_CRIADA',
    'ACERTO',
    'ERRO',
    'NIVEL',
    'GAME_OVER'
]

serve(async (req) => {
    try {
        // Lê o corpo UMA ÚNICA VEZ
        const corpo = await req.json()

        const {
            partida_id,
            jogador_id,
            ordem,
            tipo,
            instante,
            dados
        } = corpo

        // Validações básicas
        if (!partida_id) {
            throw new Error('partida_id é obrigatório')
        }

        if (!jogador_id) {
            throw new Error('jogador_id é obrigatório')
        }

        if (ordem === undefined || ordem === null) {
            throw new Error('ordem é obrigatória')
        }

        if (!tipo) {
            throw new Error('tipo é obrigatório')
        }

        if (instante === undefined || instante === null) {
            throw new Error('instante é obrigatório')
        }

        if (ordem < 0) {
            throw new Error('Ordem inválida')
        }

        if (instante < 0) {
            throw new Error('Instante inválido')
        }

        if (!TIPOS_PERMITIDOS.includes(tipo)) {
            throw new Error('Tipo de evento inválido')
        }

        // Busca a partida
        const {
            data: partida,
            error: errPartida
        } = await supabase
            .from('partidas')
            .select('id, jogador_id, finalizada_em, validada')
            .eq('id', partida_id)
            .single()

        if (errPartida || !partida) {
            throw new Error('Partida não encontrada')
        }

        // Confirma que a partida pertence ao jogador informado
        if (partida.jogador_id !== jogador_id) {
            throw new Error(
                'Esta partida não pertence a este jogador'
            )
        }

        if (partida.finalizada_em) {
            throw new Error('Partida já finalizada')
        }

        if (partida.validada) {
            throw new Error('Partida já validada')
        }

        // Verifica sequência dos eventos
        const {
            data: ultimoEvento,
            error: errUltimo
        } = await supabase
            .from('eventos_partida')
            .select('ordem')
            .eq('partida_id', partida_id)
            .order('ordem', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (errUltimo) {
            throw errUltimo
        }

        const ultimaOrdem = ultimoEvento
            ? ultimoEvento.ordem
            : -1

        if (ordem !== ultimaOrdem + 1) {
            throw new Error(
                `Ordem fora de sequência. Esperada: ${ultimaOrdem + 1}, recebida: ${ordem}`
            )
        }

        // Validações específicas
        if (tipo === 'ACERTO') {
            const nivelBolha = dados?.nivel_bolha

            if (
                !nivelBolha ||
                ![1, 2, 3].includes(nivelBolha)
            ) {
                throw new Error(
                    'Nível da bolha inválido para ACERTO'
                )
            }
        }

        if (tipo === 'NIVEL') {
            const novoNivel = dados?.nivel

            if (
                !novoNivel ||
                novoNivel < 1 ||
                novoNivel > 5
            ) {
                throw new Error('Nível inválido')
            }
        }

        // Registra evento
        const {
            error: errEvento
        } = await supabase
            .from('eventos_partida')
            .insert({
                partida_id,
                ordem,
                tipo,
                instante,
                dados: dados || {}
            })

        if (errEvento) {
            throw errEvento
        }

        return new Response(
            JSON.stringify({
                sucesso: true
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

    } catch (error) {

        const mensagem =
            error instanceof Error
                ? error.message
                : 'Erro desconhecido'

        return new Response(
            JSON.stringify({
                erro: mensagem
            }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }
})