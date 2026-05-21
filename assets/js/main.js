/* =========================================================
   First Slavic Baptist Church — shared scripts
   Loaded by the language landing page and both /en/ and /ru/.
   Every block is guarded so it no-ops where elements are absent.
   ========================================================= */
(function () {
  "use strict";

  var LANG_KEY = "fsbc-lang";

  /* ---- Language landing page: remember + redirect ---- */
  var landing = document.body.classList.contains("page-landing");
  if (landing) {
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
    // Skip the picker on return visits, unless ?choose is present.
    if ((saved === "en" || saved === "ru") &&
        window.location.search.indexOf("choose") === -1) {
      window.location.replace("/" + saved + "/");
      return;
    }
  }

  /* ---- Persist language choice on any [data-set-lang] link ---- */
  document.querySelectorAll("[data-set-lang]").forEach(function (el) {
    el.addEventListener("click", function () {
      try { localStorage.setItem(LANG_KEY, el.getAttribute("data-set-lang")); } catch (e) {}
    });
  });

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile navigation toggle ---- */
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    var closeNav = function () {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) closeNav();
    });
  }

  /* ---- "Get Directions": Apple Maps on Apple devices, else Google ---- */
  var ua = navigator.userAgent || "";
  var isApple = /iPhone|iPad|iPod/.test(ua) ||
                /Macintosh/.test(ua) ||
                navigator.platform === "MacIntel";
  if (isApple) {
    document.querySelectorAll(".js-directions").forEach(function (link) {
      var addr = link.getAttribute("data-address");
      if (addr) link.setAttribute("href", "https://maps.apple.com/?daddr=" + encodeURIComponent(addr));
    });
  }

  /* ---- Footer: current year ---- */
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- Gallery lightbox (active only when photos exist) ---- */
  var galleryItems = document.querySelectorAll(".gallery-item img");
  if (galleryItems.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML =
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<img alt="">';
    document.body.appendChild(box);
    var boxImg = box.querySelector("img");

    var closeBox = function () { box.classList.remove("open"); };
    galleryItems.forEach(function (img) {
      img.addEventListener("click", function () {
        boxImg.src = img.getAttribute("data-full") || img.src;
        boxImg.alt = img.alt;
        box.classList.add("open");
      });
    });
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("lightbox-close")) closeBox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeBox();
    });
  }
})();
