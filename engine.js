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

let projeteisEmCena = {
  torrenta: [],
  carangueijo: [],
  lula: [],
  polvo: [],
  ovni: []
};

/********************
 * CONTROLE DO JOGO *
 ********************/
function iniciar_jogo() {
  dicaEl.style.display = 'none';
  botao.style.display = 'none';

  // Limpa projéteis antigos
  projeteisEmCena = {
    torrenta: [],
    carangueijo: [],
    lula: [],
    polvo: [],
    ovni: []
  };

  jogoEmExecucao = true;

  posicionarObjeto(objetosDoJogo.personagens.torrenta);
  desenharObjetos(objetosDoJogo.personagens.torrenta);

  idFrameAnimacao = requestAnimationFrame(loopDoJogo);
}

function loopDoJogo() {
  if (!jogoEmExecucao) return;
  
  contexto.clearRect(0, 0, areaJogo.width, areaJogo.height);
  
  movimentarTorrentaComTeclado();
  desenharObjetos(objetosDoJogo.personagens.torrenta);
  
  // Atualiza e desenha os projéteis
  atualizarProjeteis();
  
  requestAnimationFrame(loopDoJogo);
}

/********************************
 * DEFININDO A ÁREA DO CANVAS *
 ********************************/
function definirAreaJogo() {
  let resultado = obterDimensoesEPosicaoDoElemento(containerJogo);
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
const CARANGUEIJO = [[2]];
const LULA = [[3]];
const POLVO = [[4]];
const OVNI = [[5]];

const TIRO_DA_TORRENTA = [
  [2],
  [2],
  [2],
  [2],
  [2]
];
const TIRO_CARANGUEIJO = [1];
const TIRO_LULA = [3];
const TIRO_POLVO = [4];
const TIRO_OVNI = [5];

/*******************
 * OBJETOS DO JOGO *
 *******************/
const objetosDoJogo = {
  
  personagens: {
    torrenta: {
      nome: "Torrenta",
      desenho: TORRENTA,
      largura: TORRENTA[0].length * TAMANHO_DO_PIXEL,
      altura: TORRENTA.length * TAMANHO_DO_PIXEL,
      posicaoX: 0,
      posicaoY: 0,
      velocidade: 7,
      direcao: null
    },
    carangueijo: {
      nome: "Carangueijo",
      desenho: CARANGUEIJO,
      largura: 0,
      altura: 0,
      posicaoX: 0,
      posicaoY: 0,
      velocidade: 3,
      direcao: null
    },
    lula: {
      nome: "Lula",
      desenho: LULA,
      largura: 0,
      altura: 0,
      posicaoX: 0,
      posicaoY: 0,
      velocidade: 2.5,
      direcao: null
    },
    polvo: {
      nome: "Polvo",
      desenho: POLVO,
      largura: 0,
      altura: 0,
      posicaoX: 0,
      posicaoY: 0,
      velocidade: 2,
      direcao: null
    },
    ovni: {
      nome: "OVNI",
      desenho: OVNI,
      largura: 0,
      altura: 0,
      posicaoX: 0,
      posicaoY: 0,
      velocidade: 4,
      direcao: null
    }
  },

  moldesDosProjeteis: {
    torrenta: {
      nome: "Tiro da Torrenta",
      desenho: TIRO_DA_TORRENTA,
      largura: TIRO_DA_TORRENTA[0].length * TAMANHO_DO_PIXEL,
      altura: TIRO_DA_TORRENTA.length * TAMANHO_DO_PIXEL,
      velocidade: 3,
      direcao: -1
    },
    carangueijo: {
      nome: "Tiro do Carangueijo",
      desenho: TIRO_CARANGUEIJO,
      largura: 0,
      altura: 0,
      velocidade: 2,
      direcao: -1
    },
    lula: {
      nome: "Tiro da Lula",
      desenho: TIRO_LULA,
      largura: 0,
      altura: 0,
      velocidade: 2.2,
      direcao: -1
    },
    polvo: {
      nome: "Tiro do Polvo",
      desenho: TIRO_POLVO,
      largura: 0,
      altura: 0,
      velocidade: 1.8,
      direcao: -1
    },
    ovni: {
      nome: "Tiro do OVNI",
      desenho: TIRO_OVNI,
      largura: 0,
      altura: 0,
      velocidade: 3.5,
      direcao: -1
    }
  },
};

/********************************************/
function obterDimensoesEPosicaoDoElemento(elemento) {
  let retangulo = elemento.getBoundingClientRect();
  return {
    altura: retangulo.height,
    largura: retangulo.width,
    esquerda: retangulo.left,
    topo: retangulo.top
  };
}

/**************************************/
function desenharObjetos(objeto) {
  for (let linha = 0; linha < objeto.desenho.length; linha++) {
    for (let coluna = 0; coluna < objeto.desenho[linha].length; coluna++) {
      if (objeto.desenho[linha][coluna] !== 0) {
        if (objeto.desenho[linha][coluna] === 1) contexto.fillStyle = "white";
        else if (objeto.desenho[linha][coluna] === 2) contexto.fillStyle = "skyblue";
        else if (objeto.desenho[linha][coluna] === 3) contexto.fillStyle = "PaleGreen";
        else if (objeto.desenho[linha][coluna] === 4) contexto.fillStyle = "Salmon";
        else if (objeto.desenho[linha][coluna] === 5) contexto.fillStyle = "Khaki";

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

function posicionarObjeto(objeto, objetoReferencia = null) {
  if (objetoReferencia) {
    objeto.posicaoX = objetoReferencia.posicaoX + (objetoReferencia.largura / 2) - (objeto.largura / 2);
    objeto.posicaoY = objetoReferencia.posicaoY - objeto.altura;
  } else {
    objeto.posicaoX = (coordMaxX - objeto.largura) / 2;
    objeto.posicaoY = coordMaxY - objeto.altura;
  }
}

window.addEventListener('touchmove', function (evento) {
  evento.preventDefault();
  let toque = evento.touches[0];
  let dimensoesEPosicao = obterDimensoesEPosicaoDoElemento(areaJogo);
  let posicaoXNoCanvas = toque.clientX - dimensoesEPosicao.esquerda;

  objetosDoJogo.personagens.torrenta.posicaoX = Math.max(
    0,
    Math.min(
      posicaoXNoCanvas - (objetosDoJogo.personagens.torrenta.largura / 2),
      coordMaxX - objetosDoJogo.personagens.torrenta.largura
    )
  );
}, { passive: false });

window.addEventListener('mousemove', function (evento) {
  evento.preventDefault();
  let dimensoesEPosicao = obterDimensoesEPosicaoDoElemento(areaJogo);
  let posicaoXNoCanvas = evento.clientX - dimensoesEPosicao.esquerda;

  objetosDoJogo.personagens.torrenta.posicaoX = Math.max(
    0,
    Math.min(
      posicaoXNoCanvas - (objetosDoJogo.personagens.torrenta.largura / 2),
      coordMaxX - objetosDoJogo.personagens.torrenta.largura
    )
  );
}, { passive: false });

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
  let velocidade = objetosDoJogo.personagens.torrenta.velocidade;
  if (teclas.ArrowLeft) {
    objetosDoJogo.personagens.torrenta.posicaoX = Math.max(
      0,
      objetosDoJogo.personagens.torrenta.posicaoX - velocidade
    );
  }
  if (teclas.ArrowRight) {
    objetosDoJogo.personagens.torrenta.posicaoX = Math.min(
      coordMaxX - objetosDoJogo.personagens.torrenta.largura,
      objetosDoJogo.personagens.torrenta.posicaoX + velocidade
    );
  }
}

function dispararProjetil(objetoProjetil, objetoReferencia, tempo) {
  // Posiciona o projétil na posição inicial (centralizado no objeto que dispara)
  objetoProjetil.posicaoX = objetoReferencia.posicaoX + (objetoReferencia.largura / 2) - (objetoProjetil.largura / 2);
  objetoProjetil.posicaoY = objetoReferencia.posicaoY - objetoProjetil.altura;

  // Adiciona o projétil ao array de projéteis em cena
  projeteisEmCena.torrenta.push(objetoProjetil);
}

function atualizarProjeteis() {
  var i;
  for (i = 0; i < projeteisEmCena.torrenta.length; i++) {
    var proj = projeteisEmCena.torrenta[i];
    proj.posicaoY += (proj.velocidade * proj.direcao);
    
    // Se o projétil sair da área do jogo, remova-o do array
    if (proj.posicaoY < 0 || proj.posicaoY > coordMaxY) {
      projeteisEmCena.torrenta.splice(i, 1);
      i--; // Ajuste o índice após a remoção
    } else {
      desenharObjetos(proj);
    }
  }
}
/* chamei atualizarProjeteis dentro do loop */

let disparoLiberado = true;
const TEMPO_COOLDOWN = 1500; // em milissegundos

document.addEventListener('keydown', function(evento) {
  if (evento.code === 'Space' && disparoLiberado) { //No evento keydown, usamos evento.code porque ele retorna uma string identificando a tecla (como "Space").
    disparoLiberado = false;
    let tiro = { ...objetosDoJogo.moldesDosProjeteis.torrenta };
    dispararProjetil(tiro, objetosDoJogo.personagens.torrenta);
    setTimeout(function() {
      disparoLiberado = true;
    }, TEMPO_COOLDOWN);
  }
});

 

 document.addEventListener('mousedown', function(evento) {
  if (evento.button === 0 && disparoLiberado) { //no evento.button retorna um número indicando qual botão do mouse foi clicado, nesse caso o 0 (botão esquerdo)
    disparoLiberado = false;
    let tiro = { ...objetosDoJogo.moldesDosProjeteis.torrenta };
    dispararProjetil(tiro, objetosDoJogo.personagens.torrenta);
    setTimeout(function() {
      disparoLiberado = true;
    }, TEMPO_COOLDOWN);
  }
});

document.addEventListener('mousedown', function(evento) {
  if (evento.button === 0 && disparoLiberado) { //no evento.button retorna um número indicando qual botão do mouse foi clicado, nesse caso o 0 (botão esquerdo)
    disparoLiberado = false;
    let tiro = { ...objetosDoJogo.moldesDosProjeteis.torrenta };
    dispararProjetil(tiro, objetosDoJogo.personagens.torrenta);
    setTimeout(function() {
      disparoLiberado = true;
    }, TEMPO_COOLDOWN);
  }
});



function aoRedimensionar() {
  let dimensoes = obterDimensoesDaTela();
  atualizarTamanhoDaFonte(dimensoes.alturaDaTela);

  definirAreaJogo();
  definirCoordAreaJogo();
  posicionarObjeto(objetosDoJogo.personagens.torrenta);
  desenharObjetos(objetosDoJogo.personagens.torrenta);
}

window.addEventListener('resize', debounce(aoRedimensionar, 100), false);

(function inicializar() {
  aoRedimensionar();
})();
