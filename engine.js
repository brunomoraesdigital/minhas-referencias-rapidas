/* contador */

// Acessamos os elementos HTML pelos seus IDs para poder manipulá-los no JavaScript
const contadorElemento = document.getElementById('contador'); // O elemento que vai exibir o número
const incrementaBotao = document.getElementById('incrementa'); // O botão para incrementar (aumentar) o número
const decrementaBotao = document.getElementById('decrementa'); // O botão para decrementar (diminuir) o número

// Definimos uma variável que vai armazenar o número (começamos com 0)
let num = 0;

// Função que será chamada quando o botão de incremento for clicado
function aumentar() {
    num++; // Aumenta o valor de num em 1 (num = num + 1)
    contadorElemento.textContent = num; // Atualiza o conteúdo do elemento HTML para mostrar o novo valor de num
}

// Função que será chamada quando o botão de decremento for clicado
function diminuir() {
    num--; // Diminui o valor de num em 1 (num = num - 1)
    contadorElemento.textContent = num; // Atualiza o conteúdo do elemento HTML para mostrar o novo valor de num
}

// Quando o botão de incremento for clicado, chamamos a função "aumentar"
incrementaBotao.addEventListener('click', aumentar);

// Quando o botão de decremento for clicado, chamamos a função "diminuir"
decrementaBotao.addEventListener('click', diminuir);


/* Mudança de cor */

const mudarCorFundoBotao = document.getElementById('mudarCorFundo')

function