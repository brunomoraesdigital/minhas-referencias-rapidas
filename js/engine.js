let navIcon = document.getElementById('nav-icon');
let navClose = document.getElementById('nav-close');
let navList = document.getElementById('nav-list');

function toggleClassesNav () {
  navIcon.classList.toggle('move-nav-icon');
  navList.classList.toggle('move-nav-list');
  navClose.classList.toggle('move-nav-close');
}
function removeClassesNav () {
  navIcon.classList.remove('move-nav-icon');
  navList.classList.remove('move-nav-list');
  navClose.classList.remove('move-nav-close');
}

navIcon.addEventListener('click', toggleClassesNav);
navClose.addEventListener('click', removeClassesNav);

/*
document.addEventListener("DOMContentLoaded", function () {
  // Passo 1: Identificar as seções
  const sections = ["hero", "introduction", "mission", "about", "professional", "contact"];

  // Passo 2: Obter referências para os elementos <li>
  const navItems = document.querySelectorAll("#nav-list ul li");

  // Passo 3: Adicionar um Event Listener de Rolagem
  window.addEventListener("scroll", function () {
    // Passo 4: Determinar a Seção Atual
    const currentPosition = window.scrollY;
    let currentSection = "";

    for (const sectionId of sections) {
      const sectionElement = document.getElementById(sectionId);
      const sectionTop = sectionElement.offsetTop;
      const sectionBottom = sectionTop + sectionElement.offsetHeight;

      if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
        currentSection = sectionId;
        break;
      }
    }

    // Passo 5: Atualizar Classes
    navItems.forEach((item) => {
      const sectionId = item.querySelector("a").getAttribute("href").substring(1);
      item.classList.toggle("active", sectionId === currentSection);
    });
  });
});
*/

/*document.addEventListener("DOMContentLoaded", function () {
  // Passo 1: Identificar as seções
  const sections = ["hero", "introduction", "mission", "professional",  "about", "contact"];

  // Passo 2: Obter referências para os elementos <li>
  const navItems = document.querySelectorAll("#nav-list ul li");

  // Passo 3: Adicionar um Event Listener de Rolagem
  window.addEventListener("scroll", function () {
    // Passo 4: Determinar a Seção Atual
    const currentPosition = window.scrollY;
    let currentSection = "";

    for (const sectionId of sections) {
      const sectionElement = document.getElementById(sectionId);
      const sectionRect = sectionElement.getBoundingClientRect();

      // Considera a seção no topo da página
      if (sectionRect.top <= 0 && sectionRect.bottom >= 0) {
        currentSection = sectionId;
        break;
      }
    }

    // Se nenhuma seção estiver no topo, verifica se está no final da página
    if (!currentSection && currentPosition + window.innerHeight >= document.body.offsetHeight) {
      currentSection = sections[sections.length - 1];
    }

    // Passo 5: Atualizar Classes
    navItems.forEach((item) => {
      const sectionId = item.querySelector("a").getAttribute("href").substring(1);
      item.classList.toggle("active", sectionId === currentSection);
    });
  });
});*/

/*document.addEventListener("DOMContentLoaded", function () {
  // Passo 1: Identificar as seções
  const sections = ["hero", "introduction", "mission", "about", "professional", "contact"];

  // Passo 2: Obter referências para os elementos <li>
  const navItems = document.querySelectorAll("#nav-list ul li");

  // Passo 3: Adicionar um Event Listener de Rolagem
  window.addEventListener("scroll", function () {
    // Restante do código para determinar a seção atual (mantenha como está)
    const currentPosition = window.scrollY;
    let currentSection = "";

    for (const sectionId of sections) {
      const sectionElement = document.getElementById(sectionId);
      const sectionRect = sectionElement.getBoundingClientRect();

      // Considera a seção no topo da página
      if (sectionRect.top <= 0 && sectionRect.bottom >= 0) {
        currentSection = sectionId;
        break;
      }
    }

    // Se nenhuma seção estiver no topo, verifica se está no final da página
    if (!currentSection && currentPosition + window.innerHeight >= document.body.offsetHeight) {
      currentSection = sections[sections.length - 1];
    }

    // Atualizar Classes
    navItems.forEach((item) => {
      const sectionId = item.querySelector("a").getAttribute("href").substring(1);
      item.classList.toggle("active", sectionId === currentSection);
    });
  });

  // Passo 4: Adicionar Event Listener de Clique para Atualizar Ativo ao Clicar nas Seções
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
});*/
