/* **********
 * LOADING  *
 ********** */

let canvasLoading = document.getElementById("canvasLoading");
let ctx = canvasLoading.getContext("2d");

let tamanhoPixel = 3;

let magoParado = [
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0]
];

let magoAndando1 = [
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]

];

let magoAndando2 = [
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0]
]

// Definindo o objeto mago
let mago = {
  parado: {
    nome: "parado",
    matriz: magoParado
  },
  andando1: {
    nome: "andando1",
    matriz: magoAndando1
  },
  andando2: {
    nome: "andando2",
    matriz: magoAndando2
  },

  // Função para desenhar o mago em ação no canvas
  desenhar: function (acao, posX, posY) {
    let acaoEscolhida = this[acao];  // Pega a matriz da ação escolhida
    if (acaoEscolhida) {
      for (let i = 0; i < acaoEscolhida.matriz.length; i++) {
        for (let j = 0; j < acaoEscolhida.matriz[i].length; j++) {
          if (acaoEscolhida.matriz[i][j] === 1) {  // Verifica se é parte da "imagem"
            ctx.fillStyle = "white";  // Pode mudar a cor ou o estilo conforme necessário
            ctx.fillRect((posX * 10) + j * tamanhoPixel, (posY * 10) + i * tamanhoPixel, tamanhoPixel, tamanhoPixel);
          }
        }
      }
    }
  }
};

// Função para desenhar o mago em qualquer posição com um único objeto
function desenharMago(acao, posicao) {
  let { x, y } = posicao; // Desestruturando o objeto para obter x e y
  mago.desenhar(acao, x, y); // Usando a função de desenhar com a nova posição
}

// chamando a função desenharMago
desenharMago("parado", { x: 1, y: 1 });
desenharMago("andando1", { x: 1, y: 19 });
desenharMago("andando2", { x: 16, y: 19 });

let posX = -5; // Posição inicial do mago no eixo X
let posY = 1; // Posição inicial no eixo Y
let velocidade = 2.5; // Quantidade de pixels que ele se move por frame
let passo = 1; // Alterna entre os sprites

function loop() {
  ctx.clearRect(0, 0, canvasLoading.width, canvasLoading.height); // Limpa o canvas

  // Desenha o mago na nova posição
  if (passo === 1) {
    desenharMago("andando1", { x: posX, y: posY });
    passo = 2;
  } else if (passo === 2) {
    desenharMago("parado", { x: posX, y: posY });
    passo = 3;
  } else {
    desenharMago("andando2", { x: posX, y: posY });
    passo = 1;
  }

  // Move o mago para a direita
  posX += velocidade;

  if (posX * tamanhoPixel > 80) {
    posX = -5; // Volta para o começo
  }

  setTimeout(() => {
    requestAnimationFrame(loop);
  }, 200);  // Altera o sprite a cada 200ms
}

(function () {
  var loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "flex";
  }

  loop();

  var dots = document.getElementById("dots");

  function updateDots() {
    if (dots.textContent.length >= 3) {
      dots.textContent = "";
    } else {
      dots.textContent += ".";
    }
  }

  var intervalId = setInterval(updateDots, 333);

  // Registra o tempo de início
  var startTime = new Date().getTime();
  var minDuration = 3000; // 3 segundos

  window.addEventListener("load", function () {
    var elapsed = new Date().getTime() - startTime;
    var remaining = minDuration - elapsed;
    if (remaining < 0) {
      remaining = 0;
    }

    setTimeout(function () {
      clearInterval(intervalId);
      if (loader) {
        loader.style.display = "none";
      }
    }, remaining);
  });
})();

/*************************
 * ATUALIZAÇÃO CADASTRAL *
 *************************/
// Seleciona o elemento onde o ano será exibido
const anoAtualElement = document.getElementById("ano-atual");

// Obtém o ano atual
const anoAtual = new Date().getFullYear();

// Atualiza o conteúdo do elemento com o ano atual
anoAtualElement.innerHTML = `<a href="https://bmfolio.web.app/" target="_blank" rel="noopener noreferrer">
    © ${anoAtual} Bruno Moraes - Evoluindo a cada código
</a> | Licença AGPL v3`;

/* ****************************
 * AJUSTE DINÂMICO DE FONTES  *
 **************************** */

function obterDimensoesDaTela() {
  return {
    largura: window.innerWidth,
    altura: window.innerHeight
  }
}

const ALTURA_REFERENCIA = 914;
const FONTE_REFERENCIA = 16;

function atualizarTamanhoDaFonte(alturaTela) {
  let tamanhoDaFonte = Math.floor((FONTE_REFERENCIA * alturaTela) / ALTURA_REFERENCIA);
  document.documentElement.style.setProperty('--tamanho-da-fonte', tamanhoDaFonte + 'px');
}

/* ***************************
 * AJUSTE DINÂMICO DO CANVAS *
 *************************** */

let containerJogo = document.getElementById("container-jogo");

function obterDimensoesDosElementos(elemento) {
  let dimensoes = elemento.getBoundingClientRect();
  return {
    alturaEl: dimensoes.height,
    larguraEl: dimensoes.width
  };
}

function ajustarCanvas() {

  let dimensoesContainerJogo = obterDimensoesDosElementos(containerJogo);

  areaJogo.height = (dimensoesContainerJogo.alturaEl);
  areaJogo.width = (dimensoesContainerJogo.larguraEl);

  console.log("alt " + dimensoesContainerJogo.alturaEl+ " x larg " + dimensoesContainerJogo.larguraEl)

}

/* ****************************
 * *
 **************************** */
let areaJogo = document.getElementById("area-jogo");
let espaco = areaJogo.getContext("2d");

let dimensaoDoPixel = 5;

let desenhoDaNave = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 1, 2, 1, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0, 1, 2, 2, 2, 1, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0]
];

let nave = {
  normal: {
    nome: "normal",
    matriz: desenhoDaNave
  }
};

function desenharNaveEmMovimento(acaoNave, posNaveX, posNaveY) {
  let acaoNaveEscolhida = nave[acaoNave];

  if (acaoNaveEscolhida) {
    for (let i = 0; i < acaoNaveEscolhida.matriz.length; i++) {
      for (let j = 0; j < acaoNaveEscolhida.matriz[i].length; j++) {
        if (acaoNaveEscolhida.matriz[i][j] !== 0) {  
          espaco.fillStyle = "white";
          if (acaoNaveEscolhida.matriz[i][j] === 2) {
            espaco.fillStyle = "skyblue";
          }
          espaco.fillRect(
            (posNaveX * 10) + j * dimensaoDoPixel, 
            (posNaveY * 10) + i * dimensaoDoPixel, 
            dimensaoDoPixel, 
            dimensaoDoPixel
          );
        }
      }
    }
  }
}

function desenharNave(acao, posicaoNave) {
  let { x, y } = posicaoNave; 
  desenharNaveEmMovimento(acao, x, y); 
}

/* *****************************
 * DIMENSÕES DOS DESENHOS  *
 ***************************** */
function obterDimensoesDosDesenhos(matriz) {
  var minLinha = matriz.length;
  var maxLinha = -1;
  var minColuna = matriz[0].length;
  var maxColuna = -1;
  
  // Percorre cada linha e coluna da matriz
  for (var i = 0; i < matriz.length; i++) {
    for (var j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] === 1) {
        if (i < minLinha) {
          minLinha = i;
        }
        if (i > maxLinha) {
          maxLinha = i;
        }
        if (j < minColuna) {
          minColuna = j;
        }
        if (j > maxColuna) {
          maxColuna = j;
        }
      }
    }
  }
  
  // Se não encontrou nenhum pixel (nenhum 1)
  if (maxLinha < minLinha) {
    return { largura: 0, altura: 0 };
  }
  
  // Calcula a largura e a altura em "células" da matriz
  var altura = maxLinha - minLinha + 1;
  var largura = maxColuna - minColuna + 1;
  
  return { largura: largura, altura: altura };
}

var dimensoes = obterDimensoesDosDesenhos(desenhoDaNave);
console.log("Largura: " + dimensoes.largura);
console.log("Altura: " + dimensoes.altura);



/* ***********************************
 * APLICAR AJUSTES AO REDIMENSIONAR  *
 *********************************** */

function aoRedimensionar() {
  let dimensoes = obterDimensoesDaTela();
  atualizarTamanhoDaFonte(dimensoes.altura);

  
  ajustarCanvas();
  desenharNave("normal", { x: 1, y: 1 });
}

function debounce(funcao, tempo) {
  let tempoEspera;
  return function () {
    clearTimeout(tempoEspera);
    tempoEspera = setTimeout(funcao, tempo);
  };
}

window.addEventListener('resize', debounce(aoRedimensionar, 100));

(function inicializar() {
  aoRedimensionar();
})();

