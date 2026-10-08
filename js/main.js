/* AW Tecnologia - Landing page
   Menu mobile, cabeçalho fixo, botão flutuante, formulário -> WhatsApp */
(function () {
  "use strict";

  var WHATSAPP = "5561991323532"; // (61) 99132-3532

  var topo = document.getElementById("topo");
  var menu = document.getElementById("menu");
  var burger = document.getElementById("burger");
  var flutuante = document.getElementById("flutuante");
  var hero = document.getElementById("inicio");
  var form = document.getElementById("form-contato");

  /* ---------- Ano no rodapé ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Cabeçalho com fundo ao rolar ---------- */
  function aoRolar() {
    topo.classList.toggle("is-fixo", window.scrollY > 24);
  }
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });

  /* ---------- Menu mobile ---------- */
  function fecharMenu() {
    menu.classList.remove("is-aberto");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menu");
  }
  burger.addEventListener("click", function () {
    var abrir = !menu.classList.contains("is-aberto");
    menu.classList.toggle("is-aberto", abrir);
    burger.setAttribute("aria-expanded", String(abrir));
    burger.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) fecharMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") fecharMenu();
  });

  /* ---------- Botão flutuante: aparece depois do hero ---------- */
  if ("IntersectionObserver" in window && hero && flutuante) {
    new IntersectionObserver(function (entradas) {
      flutuante.classList.toggle("is-visivel", !entradas[0].isIntersecting);
    }, { threshold: 0.05 }).observe(hero);
  } else if (flutuante) {
    flutuante.classList.add("is-visivel");
  }

  /* ---------- Formulário -> WhatsApp ---------- */
  if (form) {
    var campoNome = document.getElementById("nome");
    var erroNome = document.getElementById("erro-nome");

    campoNome.addEventListener("input", function () {
      campoNome.removeAttribute("aria-invalid");
      erroNome.textContent = "";
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nome = campoNome.value.trim();
      if (nome.length < 2) {
        campoNome.setAttribute("aria-invalid", "true");
        erroNome.textContent = "Digite seu nome para continuarmos.";
        campoNome.focus();
        return;
      }

      var servico = document.getElementById("servico").value;
      var negocio = document.getElementById("negocio").value.trim();

      var msg = "Olá! Meu nome é " + nome + " e quero um orçamento de " + servico + ".";
      if (negocio) msg += " Meu negócio: " + negocio + ".";
      msg += " Vim pelo site da AW Tecnologia.";

      registrar("form", "whatsapp");
      window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  /* ---------- Eventos de clique (Google Tag Manager / Meta Pixel, se instalados) ---------- */
  function registrar(origem, canal) {
    try {
      if (window.dataLayer) window.dataLayer.push({ event: "clique_contato", canal: canal, origem: origem });
      if (typeof window.fbq === "function") window.fbq("track", "Contact", { canal: canal, origem: origem });
    } catch (err) { /* sem bloqueio */ }
  }
  document.addEventListener("click", function (e) {
    var wpp = e.target.closest("[data-wpp]");
    var ig = e.target.closest("[data-ig]");
    if (wpp) registrar(wpp.getAttribute("data-wpp"), "whatsapp");
    else if (ig) registrar(ig.getAttribute("data-ig"), "instagram");
  });
})();
