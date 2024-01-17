const anoAtualElement = document.getElementById("ano-atual");
const anoAtual = new Date().getFullYear();
anoAtualElement.textContent = `Copyright ©
${anoAtual} Bruno Moraes`;

/* */

document.addEventListener("DOMContentLoaded", function () {
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