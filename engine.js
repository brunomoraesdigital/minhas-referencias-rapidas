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

/* *********************************
/* FUNÇÃO PARA DEBOUNCAR CHAMADAS *
***********************************/
function debounce(funcao, tempo) {
  let tempoEspera;
  return function() {
    clearTimeout(tempoEspera);
    tempoEspera = setTimeout(funcao, tempo);
  };
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
const TAMANHO_DO_PIXEL = 5;
let velocidade = 2.5;
let posicaoTiroDaNaveX, posicaoTiroDaNaveY;
let jogoEmExecucao;
let idFrameAnimacao;

/********************
 * CONTROLE DO JOGO *
 ********************/
function iniciar_jogo() {
  // Esconde elementos da interface
  dicaEl.style.display = 'none';
  botao.style.display = 'none';

  // Define que o jogo está rodando
  jogoEmExecucao = true;

  // Posiciona a Torrenta no início do jogo
  definirPosicaoInicialDaTorrenta();

  // Desenha a Torrenta no canvas
  desenharObjetos(objetosDoJogo.objTorrenta);

  // Inicia o loop de animação do jogo
  idFrameAnimacao = requestAnimationFrame(loopDoJogo);
}

function loopDoJogo() {
  if (!jogoEmExecucao) return;

  // Limpa o canvas antes de redesenhar
  contexto.clearRect(0, 0, areaJogo.width, areaJogo.height);

  // Movimenta a Torrenta se necessário (por exemplo, via teclado)
  movimentarTorrentaComTeclado();

  // Redesenha a Torrenta na nova posição
  desenharObjetos(objetosDoJogo.objTorrenta);

  // Continua o loop
  requestAnimationFrame(loopDoJogo);
}

/********************************
 * DEFININDO A ÁREA DO CANVAS *
 ********************************/
function definirAreaJogo() {
  let resultado = obterDimensoesEPosicaoDoElemento(containerJogo);
  // Ajusta as dimensões internas do canvas
  areaJogo.height = resultado.altura;
  areaJogo.width = resultado.largura;
}

function definirCoordAreaJogo() {
  coordMinX = 0;
  coordMinY = 0;
  coordMaxX = areaJogo.width;
  coordMaxY = areaJogo.height;

  console.log('Mínimo X: ' + coordMinX + ', Máximo X: ' + coordMaxX);
  console.log('Mínimo Y: ' + coordMinY + ', Máximo Y: ' + coordMaxY);
}

/**************************
 * DESENHOS USANDO MATRIZ *
 **************************/
const TORRENTA = [
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 2, 1, 1, 0, 0, 1],
  [1, 1, 0, 1, 2, 2, 2, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1]
];

const TIRO_DA_NAVE = [
  [1],
  [1],
  [1],
  [1],
  [1]
];

/*******************
 * OBJETOS DO JOGO *
 *******************/
const objetosDoJogo = {
  objTorrenta: {
    nome: "Torrenta",
    desenho: TORRENTA,
    largura: TORRENTA[0].length * TAMANHO_DO_PIXEL, // Número de colunas * tamanho de cada pixel
    altura: TORRENTA.length * TAMANHO_DO_PIXEL,
    posicaoX: 0,
    posicaoY: 0
  },
  objTiroDaNave: {
    nome: "Tiro da Nave",
    desenho: TIRO_DA_NAVE,
    largura: TIRO_DA_NAVE[0].length * TAMANHO_DO_PIXEL,
    altura: TIRO_DA_NAVE.length * TAMANHO_DO_PIXEL,
    posicaoX: 0,
    posicaoY: 0
  }
};

/******************************************
 * OBTER DIMENSÕES E POSIÇÃO REUTILIZAVEL *
 ******************************************/
function obterDimensoesEPosicaoDoElemento(elemento) {
  let retangulo = elemento.getBoundingClientRect();
  return {
    altura: retangulo.height,
    largura: retangulo.width,
    esquerda: retangulo.left,
    topo: retangulo.top
  };
}
/**************************************
 * DESENHAR OS OBJETOS - REUTILIZAVEL *
 **************************************/
function desenharObjetos(objeto) {
  for (let linha = 0; linha < objeto.desenho.length; linha++) {
    for (let coluna = 0; coluna < objeto.desenho[linha].length; coluna++) {
      if (objeto.desenho[linha][coluna] !== 0) {
        if (objeto.desenho[linha][coluna] === 1) {
          contexto.fillStyle = "white";
        } else if (objeto.desenho[linha][coluna] === 2) {
          contexto.fillStyle = "skyblue";
        } else if (objeto.desenho[linha][coluna] === 3) {
          contexto.fillStyle = "PaleGreen";
        } else if (objeto.desenho[linha][coluna] === 4) {
          contexto.fillStyle = "Salmon";
        } else if (objeto.desenho[linha][coluna] === 5) {
          contexto.fillStyle = "Khaki";
        }
        contexto.fillRect(
          objeto.posicaoX + (coluna * TAMANHO_DO_PIXEL),
          objeto.posicaoY + (linha * TAMANHO_DO_PIXEL),
          TAMANHO_DO_PIXEL,
          TAMANHO_DO_PIXEL
        );
      }
    }
  }
}

/***********************
 * POSIÇÃO INICIAL DA TORRENTA *
 ***********************/
function definirPosicaoInicialDaTorrenta() {
  let larguraDaTorrenta = objetosDoJogo.objTorrenta.desenho[0].length;
  let alturaDaTorrenta = objetosDoJogo.objTorrenta.desenho.length;

  objetosDoJogo.objTorrenta.posicaoX = (coordMaxX - (larguraDaTorrenta * TAMANHO_DO_PIXEL)) / 2;
  objetosDoJogo.objTorrenta.posicaoY = coordMaxY - (alturaDaTorrenta * TAMANHO_DO_PIXEL);
}

/**************************************
 * MOVIMENTAÇÃO DA RAQUETE COM O DEDO *
 **************************************/
window.addEventListener('touchmove', function(evento) {
  evento.preventDefault();
  let toque = evento.touches[0];
  let dimensoesEPosicao = obterDimensoesEPosicaoDoElemento(areaJogo);
  let posicaoXNoCanvas = toque.clientX - dimensoesEPosicao.esquerda;

  objetosDoJogo.objTorrenta.posicaoX = Math.max(
    0,
    Math.min(
      posicaoXNoCanvas - (objetosDoJogo.objTorrenta.largura / 2),
      coordMaxX - objetosDoJogo.objTorrenta.largura
    )
  );
}, { passive: false });

/***************************************
 * MOVIMENTAÇÃO DA RAQUETE COM O MOUSE *
 ***************************************/
window.addEventListener('mousemove', function(evento) {
  evento.preventDefault();
  let dimensoesEPosicao = obterDimensoesEPosicaoDoElemento(areaJogo);
  let posicaoXNoCanvas = evento.clientX - dimensoesEPosicao.esquerda;

  objetosDoJogo.objTorrenta.posicaoX = Math.max(
    0,
    Math.min(
      posicaoXNoCanvas - (objetosDoJogo.objTorrenta.largura / 2),
      coordMaxX - objetosDoJogo.objTorrenta.largura
    )
  );
  console.log(objetosDoJogo.objTorrenta.posicaoX);
}, { passive: false });

/***********************
 * MOVIMENTAR A TORRENTA COM O TECLADO *
 ***********************/
let teclas = {
  ArrowLeft: false,
  ArrowRight: false
};

window.addEventListener('keydown', function(evento) {
  if (['ArrowLeft', 'ArrowRight'].indexOf(evento.key) !== -1) {
    evento.preventDefault();
    teclas[evento.key] = true;
  }
}, false);

window.addEventListener('keyup', function(evento) {
  if (['ArrowLeft', 'ArrowRight'].indexOf(evento.key) !== -1) {
    evento.preventDefault();
    teclas[evento.key] = false;
  }
}, false);

function movimentarTorrentaComTeclado() {
  let velocidade = 7;
  if (teclas.ArrowLeft) {
    objetosDoJogo.objTorrenta.posicaoX = Math.max(0, objetosDoJogo.objTorrenta.posicaoX - velocidade);
    console.log(teclas);
  }
  if (teclas.ArrowRight) {
    objetosDoJogo.objTorrenta.posicaoX = Math.min(
      coordMaxX - objetosDoJogo.objTorrenta.largura,
      objetosDoJogo.objTorrenta.posicaoX + velocidade
    );
    console.log(teclas);
  }
}

/* ***********************************
 * APLICAR AJUSTES AO REDIMENSIONAR  *
 *********************************** */
function aoRedimensionar() {
  // Supondo que obterDimensoesDaTela() e atualizarTamanhoDaFonte() estejam definidos
  let dimensoes = obterDimensoesDaTela();
  atualizarTamanhoDaFonte(dimensoes.alturaDaTela);

  definirAreaJogo();
  definirCoordAreaJogo();
  definirPosicaoInicialDaTorrenta();
  desenharObjetos(objetosDoJogo.objTorrenta);
  desenharObjetos(objetosDoJogo.objTiroDaNave);
}

window.addEventListener('resize', debounce(aoRedimensionar, 100), false);

(function inicializar() {
  aoRedimensionar();
})();
