document.addEventListener("DOMContentLoaded", function () {
  const anoAtualElement = document.getElementById("ano-atual");
  const anoAtual = new Date().getFullYear();
  anoAtualElement.textContent = `Copyright © ${anoAtual} Bruno Moraes`;

  // Seleciona todos os itens da lista de navegação
  const navItems = document.querySelectorAll("#nav-list li");

  // Adiciona um ouvinte de evento de rolagem à janela
  window.addEventListener("scroll", determineCurrentSection);

  function determineCurrentSection() {
      // Seleciona todas as seções com a classe "content"
      const sections = document.querySelectorAll(".content");
      
      // Obtém a altura total da página
      const pageHeight = document.documentElement.scrollHeight;

      // Obtém a posição de rolagem atual em porcentagem
      const scrollPercentage = (window.scrollY / pageHeight) * 100;

      // Itera sobre as seções
      sections.forEach((section, index) => {
          // Obtém a altura da seção atual em porcentagem
          const sectionHeightPercentage = (section.clientHeight / pageHeight) * 100;

          // Calcula a posição de rolagem onde a seção atual deve ser destacada
          const scrollPosition = index === 0 ? 0 : sectionHeightPercentage * index;

          // Adiciona a classe 'active' à seção atual se a posição de rolagem estiver dentro da faixa da seção
          if (scrollPercentage >= scrollPosition && scrollPercentage < scrollPosition + sectionHeightPercentage) {
              // Remove a classe 'active' de todos os itens da navegação
              navItems.forEach(item => item.classList.remove("active"));
              // Adiciona a classe 'active' apenas ao item correspondente à seção atual
              navItems[index].classList.add("active");
          }
      });
  }

  // Chama a função ao carregar a página
  determineCurrentSection();

  // Restante do código para alternar entre idiomas
  let navIcon = document.getElementById("nav-icon");
  let navigation = document.getElementById("navigation");
  let navClose = document.getElementById("nav-close");
  let usflag = document.getElementById('us-flag');
  let brflag = document.getElementById('br-flag');

  navIcon.addEventListener("click", function () {
      navigation.classList.toggle("open");
  });

  navClose.addEventListener("click", function () {
      navigation.classList.toggle("open");
  });

  usflag.addEventListener("click", function () {
      document.querySelectorAll('.us-text').forEach(function (element) {
          element.classList.remove('show');
          element.classList.add('hide');
      });
      document.querySelectorAll('.br-text').forEach(function (element) {
          element.classList.remove('hide');
          element.classList.add('show');
      });
  });

  brflag.addEventListener("click", function () {
      document.querySelectorAll('.us-text').forEach(function (element) {
          element.classList.remove('hide');
          element.classList.add('show');
      });
      document.querySelectorAll('.br-text').forEach(function (element) {
          element.classList.remove('show');
          element.classList.add('hide');
      });
  });
});
