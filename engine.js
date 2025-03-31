/**********
 * RODAPÉ *
 **********/
(function rodape() {
  const anoAtualElement = document.getElementById("ano-atual");

  const anoAtual = new Date().getFullYear();

  anoAtualElement.innerHTML = `<a href="https://bmfolio.web.app/" target="_blank" rel="noopener noreferrer">
    © ${anoAtual} Bruno Moraes - Evoluindo a cada código
</a> | Licença AGPL v3`;
})();

/* ****************************
 * AJUSTE DINÂMICO DE FONTES  *
 **************************** */

function obterDimensoesDaTela() {
  return {
    larguraDaTela: window.innerWidth,
    alturaDaTela: window.innerHeight
  }
}

const ALTURA_REFERENCIA = 914;
const FONTE_REFERENCIA = 16;

function atualizarTamanhoDaFonte(alturaTela) {
  let tamanhoDaFonte = Math.floor((FONTE_REFERENCIA * alturaTela) / ALTURA_REFERENCIA);
  document.documentElement.style.setProperty('--tamanho-da-fonte', tamanhoDaFonte + 'px');
}

/************************************************** */

/*************************
 * funções reutilizaveis *
 *************************/

function debounce(funcao, tempo) {
  let tempoEspera;
  return function () {
    clearTimeout(tempoEspera);
    tempoEspera = setTimeout(funcao, tempo);
  };
}

function obterDimensoesDosElementos(elemento) {
  let dimensoesDoElemento = elemento.getBoundingClientRect();
  let alturaDoElemento = dimensoesDoElemento.height;
  let larguraDoElemento = dimensoesDoElemento.width;

  return { alturaDoElemento, larguraDoElemento };
}


/*************************************
 * Selecionar Elementos da Interface *
 *************************************/
const containerJogo = document.getElementById('container-jogo');
const areaJogo = document.getElementById('area-jogo');
const botao = document.getElementById('botao');
const dicaEl = document.getElementById('dica');


/************************************
 * Obter as dimensões dos elementos *
 ************************************/

/************************************
 * Variáveis para armazenar dados  *
 ************************************/


/********************
 * CONTROLE DO JOGO *
 ********************/

function iniciar_jogo() {
  // variáveis
  // funções
  // diversos
  dicaEl.style.display = 'none';
  botao.style.display = 'none';
  jogoEmExecucao = true;
}

/********************
 * AJUSTE DO CANVAS  *
 ********************/

function ajustarAreaJogo() {
  var resultado = obterDimensoesDosElementos(containerJogo);
  // Ajusta as dimensões internas do canvas
  areaJogo.height = resultado.alturaDoElemento;
  areaJogo.width = resultado.larguraDoElemento;
  
  // Armazena as dimensões para uso posterior
  dimensoesCanvas.altura = resultado.alturaDoElemento;
  dimensoesCanvas.largura = resultado.larguraDoElemento;
  
  // Se quiser, pode também atualizar o estilo visual do canvas:
  areaJogo.style.height = resultado.alturaDoElemento + "px";
  areaJogo.style.width = resultado.larguraDoElemento + "px";
}



/* ***********************************
* APLICAR AJUSTES AO REDIMENSIONAR  *
*********************************** */

function aoRedimensionar() {
  let dimensoes = obterDimensoesDaTela();
  atualizarTamanhoDaFonte(dimensoes.alturaDaTela);

  ajustarAreaJogo();
}



window.addEventListener('resize', debounce(aoRedimensionar, 100));

(function inicializar() {
  aoRedimensionar();
})();