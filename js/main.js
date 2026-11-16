(function () {
  "use strict";
  var doc = document;
  doc.documentElement.classList.add("js");

  // Mobile navigation
  var btn = doc.getElementById("menu-btn");
  var nav = doc.getElementById("nav");
  if (btn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    btn.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setOpen(false); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  // Subtle reveal on scroll
  var items = doc.querySelectorAll(".section > h2, .card, .project, .prose, .contact");
  items.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Contact: compose an email in the visitor's mail app (no backend needed)
  var form = doc.getElementById("mail-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var message = form.elements.message.value.trim();
      if (!name || !message) return;
      var subject = "Portfolio enquiry from " + name;
      var body = message + "\n\n— " + name;
      window.location.href = "mailto:shahzaibbajwa293@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
})();
