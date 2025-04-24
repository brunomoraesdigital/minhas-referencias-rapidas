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
  };
}

const REFERENCIA = {
  alturaDaTela: 914,
  tamanhoDaFonte: 16
};

function atualizarTamanhoDaFonte(alturaTela) {
  let tamanhoDaFonte = Math.floor((REFERENCIA.tamanhoDaFonte * alturaTela) / REFERENCIA.alturaDaTela);
  document.documentElement.style.setProperty('--tamanho-da-fonte', tamanhoDaFonte + 'px');
}

function aoRedimensionar() {
  const dimensoes = obterDimensoesDaTela();
  atualizarTamanhoDaFonte(dimensoes.alturaDaTela);
}

function debouncer(funcao, atraso) {
  let temporizador;
  return function () {
    clearTimeout(temporizador);
    let contexto = this;
    let argumentos = arguments;
    temporizador = setTimeout(function () {
      funcao.apply(contexto, argumentos);
    }, atraso);
  };
}

window.addEventListener('resize', debouncer(aoRedimensionar, 100));

(function inicializar() {
  aoRedimensionar();
})();


/************************************************** */
