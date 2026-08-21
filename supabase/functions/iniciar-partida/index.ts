import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Variáveis do Supabase não configuradas')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { jogador_id } = await req.json()

    if (!jogador_id) {
      throw new Error('jogador_id é obrigatório')
    }

    const { data: jogador, error: errJogador } = await supabase
      .from('jogadores')
      .select('id')
      .eq('id', jogador_id)
      .single()

    if (errJogador || !jogador) {
      return new Response(
        JSON.stringify({ erro: 'Jogador não encontrado' }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      )
    }

    const { data: partida, error: errPartida } = await supabase
      .from('partidas')
      .insert({
        jogador_id,
        iniciada_em: new Date().toISOString(),
        validada: false
      })
      .select('id')
      .single()

    if (errPartida) {
      throw errPartida
    }

    return new Response(
      JSON.stringify({ partida_id: partida.id }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({
        erro: error instanceof Error ? error.message : String(error)
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})
