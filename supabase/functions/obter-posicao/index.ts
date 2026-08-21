import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(
    supabaseUrl,
    supabaseServiceKey
)

serve(async (req) => {
    try {

        const { jogador_id } = await req.json()

        if (!jogador_id) {
            throw new Error('jogador_id é obrigatório')
        }

        const {
            data,
            error
        } = await supabase.rpc(
            'obter_posicao_jogador',
            {
                p_jogador_id: jogador_id
            }
        )

        if (error) {
            throw error
        }

        return new Response(
            JSON.stringify({
                posicao: data
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