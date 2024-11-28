// Seleção de elementos do DOM
// O DOM (Document Object Model) é a estrutura de objetos que representa a página web no navegador. Usamos o método `getElementById` para pegar os elementos específicos da página através dos seus IDs.
const botaoBuscarPokemon = document.getElementById('buscarPokemon'); // Aqui pegamos o botão onde o usuário clica para buscar o Pokémon.
const entradaNomeIdPokemon = document.getElementById('nomeIdPokemon'); // Pegamos o campo de entrada (input) onde o usuário digita o nome ou ID do Pokémon.
const informacoesPokemon = document.getElementById('informacoesPokemon'); // Pegamos a área onde vamos mostrar as informações do Pokémon.

// Função para buscar dados do Pokémon
// Esta função é responsável por pegar o nome ou ID do Pokémon digitado pelo usuário e fazer a requisição à API para buscar as informações.
async function buscarDadosPokemon() {
  // Pegamos o valor digitado no campo de entrada e fazemos o "trim" para remover espaços extras e transformamos para minúsculas para garantir que não importa a forma como o usuário digitar.
  const nomeOuId = entradaNomeIdPokemon.value.trim().toLowerCase();

  // Se o campo de entrada estiver vazio, mostramos uma mensagem para o usuário e paramos a execução da função.
  if (!nomeOuId) {
    informacoesPokemon.innerHTML = `<div class='idInvalido'><p>ID ou Nome inválido.</p></div>`;
    return; // Se o valor estiver vazio, a função é interrompida aqui.
  }

  try {
    // Fazemos a requisição à API para buscar os dados do Pokémon
    // Estamos fazendo uma requisição GET para a API do Pokémon utilizando o nome ou ID do Pokémon.
    // fetch(): A função fetch faz uma requisição para a URL fornecida. A URL pode ser de uma API, um arquivo, ou qualquer outro recurso disponível via HTTP.
    // await: Ao usar await, a execução do código será pausada até que a requisição feita pelo fetch seja concluída. O await espera a Promise retornada pelo fetch ser resolvida antes de continuar a execução do código.
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeOuId}`);
    
    // Se a resposta da requisição não for ok (status HTTP 200), jogamos um erro.
    if (!resposta.ok) {
      //O throw é uma instrução em JavaScript usada para lançar (ou gerar) um erro manualmente. Quando você utiliza throw, está criando uma exceção que pode ser capturada por um bloco try...catch ou, caso não seja tratada, interromperá a execução do código.
      throw new Error('Pokémon não encontrado');
    }
    // Pegamos os dados do Pokémon
    // Caso a resposta seja ok, usamos `.json()` para converter os dados recebidos em formato JSON.
    const dados = await resposta.json();
    // Buscando as informações adicionais do Pokémon, como as descrições
    const respostaComportamentoAmbiental = await fetch(dados.species.url);
    const dadosComportamentoAmbiental = await respostaComportamentoAmbiental.json();
    // Aqui obtemos a descrição da espécie do Pokémon
    const especiePokemon = dadosComportamentoAmbiental.genera.find(g => g.language.name === 'en');

    // Verifique se a propriedade "flavor_text_entries" existe e tem pelo menos uma descrição
    if (!dadosComportamentoAmbiental.flavor_text_entries || dadosComportamentoAmbiental.flavor_text_entries.length === 0) {
      throw new Error("Descrição do Pokémon não encontrada.");
    }

    // Buscando fraquezas e resistências do Pokémon baseado nos tipos
    // Agora que temos os dados do Pokémon, chamamos a função para buscar fraquezas e resistências.
    const fraquezasResistencias = await buscarFraquezasResistencias(dados.types);

    // Finalmente, chamamos a função que vai exibir os dados do Pokémon na página.
    exibirDadosPokemon(dados, fraquezasResistencias, dadosComportamentoAmbiental, especiePokemon);
  } catch (erro) {
    // Se ocorrer qualquer erro (ex: Pokémon não encontrado ou erro na API), mostramos a mensagem de erro.
    informacoesPokemon.innerHTML = `<div class='idInvalido'><p>Erro: ${erro.message}</p></div>`;
  }
}


// Função para buscar fraquezas e resistências baseadas nos tipos do Pokémon
// Essa função recebe os tipos do Pokémon e vai buscar as fraquezas e resistências associadas a cada tipo.
async function buscarFraquezasResistencias(tipos) {
  // Usamos `Set` para garantir que não tenhamos fraquezas ou resistências repetidas.
  const fraquezas = new Set(); // Fraquezas são tipos que causam o dobro de dano ao Pokémon.
  const resistencias = new Set(); // Resistências são tipos que causam metade do dano ao Pokémon.

  // Para cada tipo do Pokémon, fazemos uma requisição à API de tipos para obter as informações sobre as fraquezas e resistências.
  for (const tipo of tipos) {
    const respostaTipo = await fetch(tipo.type.url); // Cada tipo possui uma URL que contém as informações detalhadas sobre ele.
    const dadosTipo = await respostaTipo.json(); // Pegamos os dados do tipo e convertemos para JSON.

    // Agora, verificamos as fraquezas do tipo, ou seja, os tipos que causam o dobro de dano a este Pokémon.
    dadosTipo.damage_relations.double_damage_from.forEach(tipoFraqueza =>
      fraquezas.add(tipoFraqueza.name) // Adicionamos cada fraqueza ao conjunto de fraquezas (set).
    );

    // Verificamos as resistências do tipo, ou seja, os tipos que causam metade do dano.
    dadosTipo.damage_relations.half_damage_from.forEach(tipoResistencia =>
      resistencias.add(tipoResistencia.name) // Adicionamos cada resistência ao conjunto de resistências (set).
    );
  }

  // Retornamos as fraquezas e resistências em arrays, ordenados para facilitar a visualização.
  return {
    fraquezas: Array.from(fraquezas).sort(),
    resistencias: Array.from(resistencias).sort(),
  };
}


// Função para exibir informações do Pokémon no DOM
// Esta função é chamada para exibir todas as informações que encontramos sobre o Pokémon, como nome, imagem, fraquezas, resistências e som.
function exibirDadosPokemon(pokemon, fraquezasResistencias, comportamentoAmbiental, especie) {
  // Montamos a URL para o som do Pokémon, utilizando o nome do Pokémon. Este arquivo de som está hospedado em um servidor externo.
  const somPokemonUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3`;
  const descricaoDaEspecie = especie ? especie.genus : 'Descrição não disponível.';
  // Verifica se comportamentoAmbiental existe e tem flavor_text_entries
  //
  const comportamentoNoAmbiente = comportamentoAmbiental && comportamentoAmbiental.flavor_text_entries
    ? comportamentoAmbiental.flavor_text_entries.find(entry => entry.language.name === "en")
    : null;

  // Aqui estamos atualizando o conteúdo HTML da área onde vamos exibir as informações sobre o Pokémon.
  informacoesPokemon.innerHTML = `
    <div class="nomeDoPokemon">
      <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <!-- Aqui capitalizamos a primeira letra do nome do Pokémon para exibi-la de forma mais bonita. -->
    </div>
    <div class="idDoPokemon">
      <p><strong>ID:</strong> ${pokemon.id}</p>
      <!-- Mostramos o ID do Pokémon. -->
    </div>
    <div class="imagemDoPokemon">
      <img src="${pokemon.sprites.front_default}" alt="Imagem de ${pokemon.name}">
      <!-- Exibimos a imagem do Pokémon. -->
    </div>
    
    <div class="especieDoPokemon">
      <p><strong>Espécie:</strong> ${descricaoDaEspecie}</p>
    </div>

    <div class="alturaDoPokemon">
      <p><strong>Altura:</strong> ${(pokemon.height * 10)} cm</p>
      <!-- Exibimos a altura em centímetros (a API retorna em metros, então multiplicamos por 10). -->
    </div>
    <div class="pesoDoPokemon">
      <p><strong>Peso:</strong> ${(pokemon.weight / 10).toFixed(1)} kg</p>
      <!-- Exibimos o peso em kg (a API retorna em hectogramas, então dividimos por 10). -->
    </div>
    <div class="elementoDoPokemon">
      <p><strong>Elemento:</strong> ${pokemon.types.map(tipo => tipo.type.name).join(', ')}</p>
      <!-- Exibimos os tipos do Pokémon, unindo-os com uma vírgula. -->
    </div>
    <div class="fraquezaDoPokemon">
      <p><strong>Fraquezas:</strong> ${
        fraquezasResistencias.fraquezas.length
          ? fraquezasResistencias.fraquezas.join(', ') // Se houver fraquezas, mostramos, separando-as por vírgulas.
          : 'Nenhuma'
      }</p>
      <!-- Caso não haja fraquezas, mostramos 'Nenhuma'. -->
    </div>
    <div class="resistenciaDoPokemon">
      <p><strong>Resistências:</strong> ${
        fraquezasResistencias.resistencias.length
          ? fraquezasResistencias.resistencias.join(', ') // O mesmo para resistências.
          : 'Nenhuma'
      }</p>
      <!-- Caso não haja resistências, mostramos 'Nenhuma'. -->
    </div>
    </div>
    <div class="descricaoDoPokemon">
      <p><strong>Descrição:</strong> ${comportamentoNoAmbiente ? comportamentoNoAmbiente.flavor_text.replace(/\n/g, ' ') : 'Descrição não disponível.'}</p>
    </div>
    <audio autoplay>
      <source src="${somPokemonUrl}" type="audio/mpeg"> 
      Seu navegador não suporta o elemento de áudio.
    </audio>
  `;
}


// Adicionar evento ao botão
// Aqui estamos adicionando um "ouvinte de evento" no botão, ou seja, estamos dizendo que quando o botão for clicado, a função `buscarDadosPokemon` será chamada.
botaoBuscarPokemon.addEventListener('click', buscarDadosPokemon);
