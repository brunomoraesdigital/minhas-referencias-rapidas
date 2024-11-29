// Contador
const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');

let count = 0;

incrementButton.addEventListener('click', () => {
    count++;
    counterElement.textContent = count;
});

decrementButton.addEventListener('click', () => {
    count--;
    counterElement.textContent = count;
});

// Trocar cor de fundo
const changeColorButton = document.getElementById('changeColor');
changeColorButton.addEventListener('click', () => {
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
    document.body.style.backgroundColor = randomColor;
});

// Saudação com formulário
const nameInput = document.getElementById('nameInput');
const greetButton = document.getElementById('greet');
const greetingElement = document.getElementById('greeting');

greetButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        greetingElement.textContent = `Olá, ${name}! Bem-vindo à prática de JavaScript.`;
    } else {
        greetingElement.textContent = 'Por favor, insira seu nome.';
    }
});

// Galeria de imagens
const addImageButton = document.getElementById('addImage');
const galleryElement = document.getElementById('gallery');

addImageButton.addEventListener('click', () => {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/100?random=${Math.random()}`;
    galleryElement.appendChild(img);
});
