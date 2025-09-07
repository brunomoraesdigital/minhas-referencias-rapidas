function areaVizualizacao() {
  document.documentElement.style.setProperty(
    "--altura-viewport",
    window.innerHeight + "px"
  );
  document.documentElement.style.setProperty(
  "--largura-viewport",
  window.innerWidth + "px"
);
}

window.addEventListener("resize", areaVizualizacao);
areaVizualizacao();