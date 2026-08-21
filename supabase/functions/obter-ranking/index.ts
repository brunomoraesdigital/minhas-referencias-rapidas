import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async () => {
  try {
    const { data, error } = await supabase
      .from('jogadores')
      .select('id, nome, recorde, melhor_eficiencia, melhor_nivel, total_partidas')
      .order('recorde', { ascending: false })
      .order('melhor_eficiencia', { ascending: false })
      .limit(100)

    if (error) throw error

    const ranking = data.map((jogador, index) => ({
      posicao: index + 1,
      ...jogador
    }))

    return new Response(JSON.stringify(ranking), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ erro: error.message }), { status: 400 })
  }
})