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
  return function () {
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
  posicionarObjeto(objetosDoJogo.objTorrenta);
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

const TIRO_DA_TORRENTA = [
  [2],
  [2],
  [2],
  [2],
  [2]
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
    posicaoY: 0,
    velocidade: 7
  },
  objTiroDaTorrenta: {
    nome: "Tiro da Torrenta",
    desenho: TIRO_DA_TORRENTA,
    largura: TIRO_DA_TORRENTA[0].length * TAMANHO_DO_PIXEL,
    altura: TIRO_DA_TORRENTA.length * TAMANHO_DO_PIXEL,
    posicaoX: 0,
    posicaoY: 0,
    velocidade: 2.5
  }
};

/********************************************
 * OBTER DIMENSÕES E POSIÇÃO - REUTILIZAVEL *
 ********************************************/
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
function posicionarObjeto(objeto, objetoReferencia = null) {
  if (objetoReferencia) {
    // Centralizado horizontalmente em relação ao objeto de referência
    objeto.posicaoX = objetoReferencia.posicaoX + (objetoReferencia.largura / 2) - (objeto.largura / 2);
    // Acima do objeto de referência
    objeto.posicaoY = objetoReferencia.posicaoY - objeto.altura;
  } else {
    // Posicionamento padrão (centro inferior da tela)
    objeto.posicaoX = (coordMaxX - objeto.largura) / 2;
    objeto.posicaoY = coordMaxY - objeto.altura;
  }
}

/**************************************
 * MOVIMENTAÇÃO DA RAQUETE COM O DEDO *
 **************************************/
window.addEventListener('touchmove', function (evento) {
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
window.addEventListener('mousemove', function (evento) {
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
}, { passive: false });

/***********************
 * MOVIMENTAR A TORRENTA COM O TECLADO *
 ***********************/
let teclas = {
  ArrowLeft: false,
  ArrowRight: false
};

window.addEventListener('keydown', function (evento) {
  if (['ArrowLeft', 'ArrowRight'].indexOf(evento.key) !== -1) {
    evento.preventDefault();
    teclas[evento.key] = true;
  }
}, { passive: false });

window.addEventListener('keyup', function (evento) {
  if (['ArrowLeft', 'ArrowRight'].indexOf(evento.key) !== -1) {
    evento.preventDefault();
    teclas[evento.key] = false;
  }
}, { passive: false });

function movimentarTorrentaComTeclado() {
  let velocidade = objetosDoJogo.objTorrenta.velocidade;
  if (teclas.ArrowLeft) {
    objetosDoJogo.objTorrenta.posicaoX = Math.max(0, objetosDoJogo.objTorrenta.posicaoX - velocidade);
  }
  if (teclas.ArrowRight) {
    objetosDoJogo.objTorrenta.posicaoX = Math.min(
      coordMaxX - objetosDoJogo.objTorrenta.largura,
      objetosDoJogo.objTorrenta.posicaoX + velocidade
    );
  }
}

function trajetoriaDoProjetil(objeto, objetoReferencia = null) {
/*  let dimensoesEPosicao = obterDimensoesEPosicaoDoElemento(areaJogo);


  objeto.posicaoX = (coordMaxX - objeto.largura) / 2;
  objeto.posicaoY = objeto.velocidade;*/

  console.log('disparou');
}


/*
function parar_jogo() {
  jogoEmExecucao = false;
  clearInterval(intervaloTiros);
  cancelAnimationFrame(idFrameAnimacao);
}
*/


/* ************************************************* */

/* ***********************************
 * APLICAR AJUSTES AO REDIMENSIONAR  *
 *********************************** */
function aoRedimensionar() {
  // Supondo que obterDimensoesDaTela() e atualizarTamanhoDaFonte() estejam definidos
  let dimensoes = obterDimensoesDaTela();
  atualizarTamanhoDaFonte(dimensoes.alturaDaTela);

  definirAreaJogo();
  definirCoordAreaJogo();
  posicionarObjeto(objetosDoJogo.objTorrenta);
  posicionarObjeto(objetosDoJogo.objTiroDaTorrenta, objetosDoJogo.objTorrenta);
  desenharObjetos(objetosDoJogo.objTorrenta);
  desenharObjetos(objetosDoJogo.objTiroDaTorrenta);
}

window.addEventListener('resize', debounce(aoRedimensionar, 100), false);

(function inicializar() {
  aoRedimensionar();
})();
