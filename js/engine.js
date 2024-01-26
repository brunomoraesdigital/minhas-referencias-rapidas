// Selecionando elementos do DOM
let navIcon = document.getElementById('nav-icon');
let navClose = document.getElementById('nav-close');
let navList = document.getElementById('nav-list');
let brFlag = document.getElementById('br-flag');
let usFlag = document.getElementById('us-flag');
let brText = document.getElementsByClassName('br-text');
let usText = document.getElementsByClassName('us-text');

// Função para alternar classes da barra de navegação
function toggleClassesNav() {
  navIcon.classList.toggle('move-nav-icon');
  navList.classList.toggle('move-nav-list');
  navClose.classList.toggle('move-nav-close');
}

// Função para remover classes da barra de navegação
function removeClassesNav() {
  navIcon.classList.remove('move-nav-icon');
  navList.classList.remove('move-nav-list');
  navClose.classList.remove('move-nav-close');
}

// Função para alternar para o idioma brasileiro
function switchToBr() {
  brFlag.classList.remove('show');
  usFlag.classList.remove('hide');
  brFlag.classList.add('hide');
  usFlag.classList.add('show');
  for (let i = 0; i < usText.length; i++) {
    // Oculta texto em inglês e exibe texto em português
    usText[i].classList.add('hide');
    usText[i].classList.remove('show');
    brText[i].classList.add('show');
    brText[i].classList.remove('hide');
  }
}

// Função para alternar para o idioma inglês
function switchToUs() {
  usFlag.classList.remove('show');
  brFlag.classList.remove('hide');
  usFlag.classList.add('hide');
  brFlag.classList.add('show');
  for (let i = 0; i < usText.length; i++) {
    // Oculta texto em português e exibe texto em inglês
    usText[i].classList.add('show');
    usText[i].classList.remove('hide');
    brText[i].classList.add('hide');
    brText[i].classList.remove('show');
  }
}

// Adiciona listeners de eventos aos elementos do DOM
brFlag.addEventListener('click', switchToBr);
usFlag.addEventListener('click', switchToUs);
navIcon.addEventListener('click', toggleClassesNav);
navClose.addEventListener('click', removeClassesNav);


document.addEventListener("DOMContentLoaded", function () {
  // Passo 1: Identificar as seções
  const sections = ["hero", "introduction", "mission", "professional", "about", "contact"];
  
  // Passo 2: Obter referências para os elementos <li>
  const navItems = document.querySelectorAll("#nav-list ul li");

  // Passo 3: Adicionar um Event Listener de Rolagem
  window.addEventListener("scroll", function () {
    // Obter a posição atual de rolagem
    const currentPosition = window.scrollY;
    let currentSection = "";

    // Passo 4: Iterar sobre as seções para determinar a seção atual
    for (const sectionId of sections) {
      const sectionElement = document.getElementById(sectionId);
      const sectionRect = sectionElement.getBoundingClientRect();

      // Verificar se a seção está pelo menos 50% visível na tela
      if (sectionRect.top <= window.innerHeight / 2 && sectionRect.bottom >= window.innerHeight / 2) {
        currentSection = sectionId;
        break;
      }
    }

    // Se nenhuma seção estiver no topo, verifica se está no final da página
    if (!currentSection && currentPosition + window.innerHeight >= document.body.offsetHeight) {
      currentSection = sections[sections.length - 1];
    }

    // Atualizar classes dos itens de navegação
    navItems.forEach((item) => {
      const sectionId = item.querySelector("a").getAttribute("href").substring(1);
      item.classList.toggle("active", sectionId === currentSection);
    });
    // Passo 5: Adicionar classe ao "nav-icon" quando a seção "hero" não estiver visível
    const heroSection = document.getElementById("hero");
    const heroRect = heroSection.getBoundingClientRect();
    navIcon.classList.toggle("nav-icon-background", heroRect.bottom <= 0);
  });

  // Passo 6: Adicionar Event Listener de Clique para Atualizar Ativo ao Clicar nas Seções
  navItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const sectionId = item.querySelector("a").getAttribute("href").substring(1);
      const sectionElement = document.getElementById(sectionId);
      
      // Rolagem suave para a seção clicada
      window.scrollTo({
        top: sectionElement.offsetTop,
        behavior: "smooth",
      });
    });
  });
});
