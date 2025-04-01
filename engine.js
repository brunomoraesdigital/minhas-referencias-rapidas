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

/*************
 * Variáveis *
 *************/
let coordMinX, coordMinY, coordMaxX, coordMaxY;

const contexto = areaJogo.getContext('2d');


let posicaoX, posicaoY; 

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

  // Calcular e definir a posição inicial da torrenta
  definirPosicaoInicialDaNave();

  desenharObjetos(objetosDoJogo.objTorrenta);
}

/********************************
 * DEFININDO A AREADO DO CANVAS *
 ********************************/
function definirAreaJogo() {
  let resultado = obterDimensoesDosElementos(containerJogo);
  // Ajusta as dimensões internas do canvas
  areaJogo.height = resultado.alturaDoElemento;
  areaJogo.width = resultado.larguraDoElemento;

  definirCoordAreaJogo();
}

function definirCoordAreaJogo() {
  coordMinX = 0;
  coordMinY = 0;

  coordMaxX = areaJogo.width;
  coordMaxY = areaJogo.height;

  console.log(`Mínimo X: ${coordMinX}, Máximo X: ${coordMaxX}`);
  console.log(`Mínimo Y: ${coordMinY}, Máximo Y: ${coordMaxY}`);
}

/**************************
 * DESENHOS USANDO MATRIZ *
 **************************/
const TORRENTA = [
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1]
];

/*******************
 * OBJETOS DO JOGO *
 *******************/
const objetosDoJogo = {
  objTorrenta: {
    nome: "Torrenta",
    desenho: TORRENTA,
  }
}

/***********************
 * DESENHAR OS OBJETOS *
 ***********************/
function desenharObjetos(objeto) {
  const tamanhoDoPixel = 10;

  for (let linha = 0; linha < objeto.desenho.length; linha++) {
    for (let coluna = 0; coluna < objeto.desenho[linha].length; coluna++) {
      if (objeto.desenho[linha][coluna] !== 0) {
        contexto.fillStyle = "green";
        contexto.fillRect(
          (posicaoX + coluna) * tamanhoDoPixel,
          (posicaoY + linha) * tamanhoDoPixel,
          tamanhoDoPixel,
          tamanhoDoPixel
        ); // Desenha o retângulo com a posição centralizada
      }
    }
  }
}

/***********************
 * CALCULAR A POSIÇÃO INICIAL DA TORRENTA *
 ***********************/
function definirPosicaoInicialDaNave() {
  // Calcula o meio da tela
  const larguraDaNave = objetosDoJogo.objTorrenta.desenho[0].length; // Número de colunas (largura da torrenta)
  const alturaDaNave = objetosDoJogo.objTorrenta.desenho.length; // Número de linhas (altura da torrenta)

  // Posição X centralizada
  posicaoX = (coordMaxX - larguraDaNave * 10) / 2;

  // Posição Y na base (altura máxima do canvas - altura da torrenta)
  posicaoY = coordMaxY - alturaDaNave * 10;

  console.log(`Posição Inicial X: ${posicaoX}, Posição Inicial Y: ${posicaoY}`);
}

/* ***********************************
* APLICAR AJUSTES AO REDIMENSIONAR  *
*********************************** */

function aoRedimensionar() {
  let dimensoes = obterDimensoesDaTela();
  atualizarTamanhoDaFonte(dimensoes.alturaDaTela);

  definirAreaJogo();
  definirCoordAreaJogo();
}

window.addEventListener('resize', debounce(aoRedimensionar, 100));

(function inicializar() {
  aoRedimensionar();
})();
