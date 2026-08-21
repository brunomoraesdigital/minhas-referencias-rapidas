import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  try {
    const { jogador_id } = await req.json()
    if (!jogador_id) throw new Error('jogador_id é obrigatório')

    // Verifica se o jogador existe
    const { data: jogador, error: errJogador } = await supabase
      .from('jogadores')
      .select('id')
      .eq('id', jogador_id)
      .single()
    if (errJogador || !jogador) {
      return new Response(JSON.stringify({ erro: 'Jogador não encontrado' }), { status: 404 })
    }

    // Cria a partida
    const { data: partida, error: errPartida } = await supabase
      .from('partidas')
      .insert({
        jogador_id,
        iniciada_em: new Date().toISOString(),
        validada: false
      })
      .select('id')
      .single()

    if (errPartida) throw errPartida

    return new Response(JSON.stringify({ partida_id: partida.id }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ erro: error.message }), { status: 400 })
  }
})