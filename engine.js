/* ******** */
/* contador */
/* ******** */

// Acessar os elementos HTML pelos seus IDs para poder manipulá-los no JavaScript

// Seleciona o elemento que tem o ID 'contador' da página HTML
// A variável contadorElemento guarda o elemento com o ID 'contador'
const contadorElemento = document.getElementById('contador');

// Seleciona o botão que tem o ID 'incrementa' da página HTML
// A variável 'incrementaBotao' guarda o botão que tem o ID 'incrementa'
const incrementaBotao = document.getElementById('incrementa');

// Seleciona o botão que tem o ID 'decrementa' da página HTML
// A variável 'decrementaBotao' guarda o botão que tem o ID 'decrementa'
const decrementaBotao = document.getElementById('decrementa');

// Define uma variável 'numero' para armazenar o valor do contador
// Inicialmente, começamos com o valor de 'numero' igual a 0
let numero = 0;

// Define a função 'manipularNumero' que será executada quando o botão de incremento for clicado
function manipularNumero() {
    numero++; // Aumenta o valor de 'numero' em 1 (equivalente a numero = numero + 1)
    
    // Atualiza o conteúdo do elemento 'contadorElemento' para mostrar o valor de 'numero'
    contadorElemento.textContent = numero; // O número na tela vai mudar para o novo valor de 'numero'
}

// Função chamada 'diminuir' que será executada quando o botão de decremento for clicado
function diminuir() {
    numero--; // Diminui o valor de 'numero' em 1 (equivalente a numero = numero - 1)
    
    // Atualiza o conteúdo do elemento 'contadorElemento' para mostrar o valor de 'numero'
    contadorElemento.textContent = numero; // O número na tela vai mudar para o novo valor de 'numero'
}

// Adiciona um evento de "clique" ao botão de incremento
// Quando o botão de incremento for clicado, a função 'manipularNumero' será chamada
incrementaBotao.addEventListener('click', manipularNumero);

// Adiciona um evento de "clique" ao botão de decremento
// Quando o botão de decremento for clicado, a função 'diminuir' será chamada
decrementaBotao.addEventListener('click', diminuir);

/* ************** */
/* Mudança de cor */
/* ************** */

// Seleciona o botão que tem o ID 'mudarCorFundo' da página HTML
// A variável mudarCorFundoBotao guarda o elemento com o ID 'mudarCorFundo'
const mudarCorFundoBotao = document.getElementById('mudarCorFundo');

// Define a função mudarACor que será chamada quando o botão for clicado
function mudarACor() {
    // Define uma variável 'numAleatorio' e inicializa com um número gerado aleátoriamente entre 0 e 360, para usar como o "matiz" (hue) na cor HSL
    // Math.random() gera um número entre 0 (inclusive) e 1 (exclusivo)
    // Multiplicamos esse valor por 360 para ter um número aleatório entre 0 e 360
    // Math.floor arredonda o valor para baixo, então o número vai ser um inteiro entre 0 e 359
    let numAleatorio = Math.floor(Math.random() * 360);

    // Define uma variável 'corAleatoria' e armazena com uma cor aleatória no formato HSL
    // A string 'hsl(${numAleatorio}, 70%, 80%)' vai usar o valor gerado de numAleatorio como o matiz (hue)
    // Saturação é 70% e Luminosidade é 80%, o que dá cores claras e vivas.
    const corAleatoria = `hsl(${numAleatorio}, 70%, 80%)`;

    // Aplica a cor aleatória gerada como cor de fundo da página
    // document.body se refere ao elemento <body> da página HTML
    // style.backgroundColor altera a cor de fundo do corpo da página
    document.body.style.backgroundColor = corAleatoria;
}

// Adiciona um evento de "click" ao botão para chamar a função 'mudarACor'
// Quando o botão for clicado, a função 'mudarACor' será executada, e a cor do fundo vai mudar
mudarCorFundoBotao.addEventListener('click', mudarACor);

/* ********************* */
/* Formulário interativo */
/* ********************* */

// Seleciona o campo de input da pagina HTML onde o usuário vai digitar o nome
// A variável nomeInputElement guarda o elemento com o ID 'nomeInput'
const nomeInputElement = document.getElementById('nomeInput'); 

// Seleciona o botão de saudação da página HTML
// A variável saudarBotao guarda o elemento com o ID 'saudar'
const saudarBotao = document.getElementById('saudar');

// Seleciona o elemento saudacaoElento da página HTML
// A variável saudacaoElento guarda o elemento com o ID 'saudacao'
const saudacaoElento = document.getElementById('saudacao');

// Define a função que será chamada quando o botão de saudação for clicado
function criarSaudacao() {
    // Pega o valor digitado no campo de input (nome) e remove espaços extras antes e depois
    // O método 'trim()' elimina qualquer espaço em branco do começo e do fim da string
    const nome = nomeInput.value.trim(); 

    // Capitaliza a primeira letra do nome e converte o restante para minúsculas
    // 'charAt(0)' pega o primeiro caractere do nome e 'toUpperCase()' transforma ele em maiúsculo
    // 'slice(1)' pega o restante da string a partir do segundo caractere e 'toLowerCase()' transforma em minúsculas
    const nomeCapitalizado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

    // Verifica se o nome foi digitado (não está vazio)
    if (nomeCapitalizado) {
        // Se o nome não estiver vazio, exibe a saudação personalizada
        // A template string (com crase) permite inserir o nome dentro da mensagem
        saudacaoElento.textContent = `Olá, ${nomeCapitalizado}! Boas Vindas à prática de JavaScript!`;
    } else {
        // Se o nome estiver vazio (não foi preenchido), exibe uma mensagem padrão
        saudacaoElento.textContent = `Olá, tem alguém ai?`;
    }
}

// Adiciona um "listener" de evento no botão de saudação
// 'addEventListener' vai escutar o clique do usuário no botão e chamar a função 'criarSaudacao' quando isso acontecer
saudarBotao.addEventListener('click', criarSaudacao);

/* ****************** */
/* Galeria de Imagens */
/* ****************** */

// Seleciona o botão de "adicionar imagem" da página HTML
// A variável adicionarImagemBotao guarda o elemento com o ID 'adicionarImagem'
const adicionarImagemBotao = document.getElementById('adicionarImagem');

// Seleciona o elemento de galeria onde as imagens serão adicionadas
// O método 'getElementById' também é utilizado para pegar o elemento com o ID 'galeria'
const galeriaElemento = document.getElementById('galeria');

// Define a Função que será chamada quando o botão de adicionar imagem for clicado
function criarGaleria() {
    // Cria um novo elemento de imagem (<img>) na página
    // O método 'createElement' cria um novo elemento HTML especificado como argumento
    const tagImg = document.createElement('img');
    
    // Define o atributo 'src' da imagem com um URL de uma imagem aleatória
    // A API 'https://picsum.photos' foi usada para gerar uma imagem aleatóriait 
    // 'Math.random()' gera um número aleatório, que é anexado à URL para garantir uma nova imagem a cada clique
    tagImg.src = `https://picsum.photos/100?random=${Math.random()}`;
    
    // Adiciona a imagem criada ao final do elemento de galeria
    // 'appendChild' é usado para adicionar o novo elemento de imagem dentro do elemento 'galeria'
    galeriaElemento.appendChild(tagImg);
}

// Adiciona um evento de clique no botão "adicionarImagemBotao"
// Quando o botão for clicado, a função 'criarGaleria' será executada e uma nova imagem será adicionada à galeria
adicionarImagemBotao.addEventListener('click', criarGaleria);

/* ********* */
/* conômetro */
/* ********* */

const contadorConometroElemento = document.getElementById('contadorConometro');
const iniciarConometroBotao = document.getElementById ('iniciarConometro');
const pausarConometroBotao = document.getElementById ('pausarConometro');
const pararConometroBotao = document.getElementById ('pararConometro');
const zerarConometroBotao = document.getElementById ('zerarConometro');
const voltaConometroBotao = document.getElementById('voltaConometro');
const mostrarVoltasElmento = document.getElementById('mostrarVoltas');

let numeroContagem = 0;
let numeroAtual = 0;
let sePausado = null;
let seLigado = false;
let guardarVoltas = [];
let indiceDasVoltas = 0;

function pressionarBotao (botoes) {
    switch (botoes) {
        case 'iniciar':
            iniciarContagem();
            resetarCronometro('zerar');
            sePausado = false;
            seLigado = true;
            break;
        case 'pausar':
            if (!sePausado && seLigado) {
                clearTimeout(contador);
                sePausado = true;
                pausarConometroBotao.classList.add('retomar');
                pausarConometroBotao.textContent = "Retomar";
            } else if (sePausado && seLigado) {
                sePausado = false;
                iniciarContagem();
                pausarConometroBotao.classList.remove('retomar');
                pausarConometroBotao.textContent = "Pausar";
            }
            break;
        case 'parar':
            clearTimeout(contador);
            resetarCronometro();
            numeroContagem = 0;
            seLigado = false;
            pausarConometroBotao.classList.remove('retomar');
            pausarConometroBotao.textContent = "Pausar";
            break;
        case 'zerar':
            clearTimeout(contador);
            resetarCronometro('zerar');
            numeroContagem = 0;
            seLigado = false;
            pausarConometroBotao.classList.remove('retomar');
            pausarConometroBotao.textContent = "Pausar";
            contadorConometroElemento.innerText = numeroContagem;
            break;
        case 'registrar':
            criarRegistroDasVoltas (numeroAtual);
            break;
        default:
            break;
    }
}



function criarRegistroDasVoltas(RegistroDasVoltas) {

    if (!sePausado && seLigado) {

    guardarVoltas.push(RegistroDasVoltas);
    
    let tempoFormatado = formatarTempo(guardarVoltas[indiceDasVoltas++]);

    console.log(tempoFormatado);

    const tagP = document.createElement('p');
    tagP.id = `volta-${indiceDasVoltas}`;
    
    // Coloca o tempo formatado dentro da tag <p>
    tagP.textContent = `Volta ${indiceDasVoltas}: ${tempoFormatado}`;

    mostrarVoltas.appendChild(tagP);
    }
}
function resetarCronometro(botoes) {
    
   
    if (botoes === 'zerar') {
        mostrarVoltas.innerHTML = '';  // Limpa as tags <p> quando zerar é pressionado
        console.log('entrou no if de zerar');
    }
    
    // Limpa o array de voltas
    guardarVoltas = [];  // Ou guardarVoltas.length = 0;
    // Reseta o índice (garante que novas voltas comecem do zero)
    indiceDasVoltas = 0;
    // Se houver outras variáveis associadas ao cronômetro, elas também devem ser resetadas.
    tempoAtual = 0;  // Exemplo, se houver um contador de tempo.
    console.log("Cronômetro resetado e pronto para novas voltas.");
}


function formatarTempo (formatarSegundos) {
    const horas  = Math.floor(formatarSegundos / 3600);
    const minutos = Math.floor((formatarSegundos % 3600) / 60);
    const segundos = Math.floor(formatarSegundos % 60);

    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function iniciarContagem () {
    numeroContagem++;
    /*contadorConometroElemento.innerText = numeroContagem;*/
    contadorConometroElemento.innerHTML = formatarTempo(numeroContagem)
    numeroAtual = numeroContagem;

    contador = setTimeout(iniciarContagem, 1000);
}


function iniciarContador () {
    pressionarBotao('iniciar');
}
function pausarContador () {
    pressionarBotao('pausar');
}
function pararContador () {
    pressionarBotao('parar');
}
function zerarContador () {
    pressionarBotao('zerar');   
}
function registrarVolta () {
    pressionarBotao('registrar');
}

iniciarConometroBotao.addEventListener('click', iniciarContador );
pausarConometroBotao.addEventListener('click', pausarContador );
pararConometroBotao.addEventListener('click', pararContador );
zerarConometroBotao.addEventListener('click', zerarContador );
voltaConometroBotao.addEventListener('click', registrarVolta);