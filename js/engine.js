const anoAtualElement = document.getElementById("ano-atual");
const anoAtual = new Date().getFullYear();
anoAtualElement.textContent = `Copyright ©
${anoAtual} Bruno Moraes`;   

/* */

document.addEventListener("DOMContentLoaded", function() {
    var navIcon = document.getElementById("nav-icon");
    var navigation = document.getElementById("navigation");
    var navClose = document.getElementById("nav-close");

    navIcon.addEventListener("click", function() {
        navigation .classList.toggle("open");
    });
    navClose.addEventListener("click", function() {
        navigation .classList.toggle("open");
    });
  });