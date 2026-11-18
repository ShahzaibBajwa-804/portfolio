(function () {
  "use strict";
  var S = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];
  var SKILLS = window.SKILLS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var NS = "http://www.w3.org/2000/svg";

  function el(tag, props, kids) {
    var n = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "class") n.className = props[k];
      else if (k === "text") n.textContent = props[k];
      else n.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function svg(paths, cls) {
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true");
    if (cls) s.setAttribute("class", cls);
    paths.forEach(function (d) { var p = document.createElementNS(NS, "path"); p.setAttribute("d", d); s.appendChild(p); });
    return s;
  }
  var ICONS = {
    code: ["M8 7l-5 5 5 5", "M16 7l5 5-5 5", "M14 4l-4 16"],
    layers: ["M12 3l9 5-9 5-9-5 9-5z", "M3 13l9 5 9-5", "M3 17.5l9 5 9-5"],
    db: ["M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z", "M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6", "M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"],
    tool: ["M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6 2.6-2.2z"],
    arrow: ["M5 12h14", "M13 6l6 6-6 6"],
    close: ["M6 6l12 12", "M18 6L6 18"],
    link: ["M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1", "M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"]
  };
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function projectById(id) { return PROJECTS.filter(function (p) { return p.id === id; })[0]; }
  function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : ""; }

  /* ---------- Nav ---------- */
  var nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    nav.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 820) setMenu(false); });

  var bar = $("#progress");
  function onScroll() {
    nav.classList.toggle("is-stuck", window.scrollY > 12);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* active link highlighting */
  var links = [].slice.call(menu.querySelectorAll('a[href^="#"]'));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id && !a.classList.contains("menu__cta"));
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var t = $(a.getAttribute("href")); if (t) spy.observe(t); });
  }

  /* ---------- Skills ---------- */
  var grid = $("#skills-grid");
  SKILLS.forEach(function (g, gi) {
    var list = el("ul");
    g.items.forEach(function (it) {
      var right;
      if (it.p.length) {
        right = el("span", { class: "dots", role: "img", "aria-label": "Used in: " + it.p.map(function (id) { return projectById(id).name; }).join(", ") });
        it.p.forEach(function (id) {
          right.appendChild(el("i", { class: "dot dot--" + id, title: projectById(id).name }));
        });
      } else right = el("span", { class: "basis", text: it.b || "Coursework" });
      list.appendChild(el("li", {}, [el("span", { text: it.n }), right]));
    });
    var card = el("article", { class: "skillcard reveal", style: "--rd:" + gi * 80 + "ms" }, [
      el("h3", {}, [svg(ICONS[g.icon] || ICONS.code), document.createTextNode(g.group)]), list
    ]);
    grid.appendChild(card);
  });

  /* ---------- Projects ---------- */
  var pgrid = $("#projects-grid");
  PROJECTS.forEach(function (p, i) {
    var stack = el("ul", { class: "pcard__stack" });
    p.stack.forEach(function (s) { stack.appendChild(el("li", { text: s })); });
    var card = el("button", {
      class: "pcard reveal", type: "button", "data-project": p.id,
      "aria-haspopup": "dialog", "aria-label": p.name + " — view project details",
      style: "--ac:" + p.accent + ";--rd:" + (i % 2) * 100 + "ms"
    }, [
      p.shot ? el("img", { class: "pcard__shot", src: p.shot, alt: p.name + " screenshot", loading: "lazy", width: "1280", height: "800" }) : null,
      el("div", { class: "pcard__top" }, [el("span", { class: "pcard__num", text: pad(i + 1) }), el("span", { class: "tag", text: p.kind })]),
      el("h3", { text: p.name }),
      el("p", { class: "pcard__cat", text: p.category }),
      el("p", { class: "pcard__sum", text: p.summary }),
      stack,
      el("span", { class: "pcard__more" }, [document.createTextNode("View details "), svg(ICONS.arrow)])
    ]);
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
    card.addEventListener("click", function () { openProject(p.id, true); });
    pgrid.appendChild(card);
  });

  /* ---------- Project modal ---------- */
  var dlg = $("#project-modal"), panel = $("#modal-panel"), lastFocus = null, current = -1;
  function renderProject(idx) {
    var p = PROJECTS[idx]; current = idx;
    panel.style.setProperty("--ac", p.accent);
    panel.textContent = "";
    var close = el("button", { class: "modal__close", type: "button", "aria-label": "Close project details" }, [svg(ICONS.close)]);
    close.addEventListener("click", function () { dlg.close(); });
    var feats = el("ul", { class: "feat" }); p.features.forEach(function (f) { feats.appendChild(el("li", { text: f })); });
    var stack = el("ul", { class: "modal__stack" }); p.stack.forEach(function (s) { stack.appendChild(el("li", { text: s })); });
    var cfg = (S.projects || {})[p.id] || {};
    var ml = el("div", { class: "modal__links" });
    if (safeUrl(cfg.live)) ml.appendChild(el("a", { class: "btn btn--primary", href: cfg.live, target: "_blank", rel: "noopener noreferrer" }, [document.createTextNode("Live demo "), svg(ICONS.link)]));
    if (safeUrl(cfg.repo)) ml.appendChild(el("a", { class: "btn btn--ghost", href: cfg.repo, target: "_blank", rel: "noopener noreferrer" }, [document.createTextNode("Source code "), svg(ICONS.link)]));
    var prev = PROJECTS[(idx + PROJECTS.length - 1) % PROJECTS.length], next = PROJECTS[(idx + 1) % PROJECTS.length];
    var bp = el("button", { type: "button", text: "← " + prev.name }), bn = el("button", { type: "button", text: next.name + " →" });
    bp.addEventListener("click", function () { renderProject((idx + PROJECTS.length - 1) % PROJECTS.length); history.replaceState(null, "", "#project-" + PROJECTS[current].id); focusTitle(); });
    bn.addEventListener("click", function () { renderProject((idx + 1) % PROJECTS.length); history.replaceState(null, "", "#project-" + PROJECTS[current].id); focusTitle(); });
    [close,
      p.shot ? el("img", { class: "modal__shot", src: p.shot, alt: p.name + " screenshot", width: "1280", height: "800" }) : null,
      el("span", { class: "tag" }, [document.createTextNode(p.kind)]),
      el("h3", { id: "modal-title", tabindex: "-1", text: p.name }),
      el("p", { class: "pcard__cat", text: p.category }),
      el("p", { class: "modal__desc", text: p.description }),
      el("h4", { text: "Status" }), el("p", { class: "modal__desc", text: p.status }),
      el("h4", { text: "My contribution" }), el("p", { class: "modal__desc", text: p.contribution }),
      el("h4", { text: "Key features" }), feats,
      el("h4", { text: "Technologies" }), stack,
      p.note ? el("p", { class: "callout", text: p.note }) : null,
      ml,
      el("div", { class: "modal__nav" }, [bp, bn])
    ].forEach(function (n) { if (n) panel.appendChild(n); });
    panel.scrollTop = 0;
  }
  function focusTitle() { var t = $("#modal-title"); if (t) t.focus({ preventScroll: true }); }
  function openProject(id, push) {
    var idx = PROJECTS.map(function (p) { return p.id; }).indexOf(id);
    if (idx < 0) return;
    lastFocus = document.activeElement;
    renderProject(idx);
    if (!dlg.open) dlg.showModal();
    document.body.classList.add("modal-open");
    focusTitle();
    if (push) history.replaceState(null, "", "#project-" + id);
  }
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", function () {
    document.body.classList.remove("modal-open");
    if (location.hash.indexOf("#project-") === 0) history.replaceState(null, "", "#projects");
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  });
  function routeHash() {
    var m = /^#project-(\w+)$/.exec(location.hash);
    if (m && projectById(m[1])) openProject(m[1], false);
  }
  window.addEventListener("hashchange", routeHash); routeHash();

  /* ---------- Config-driven links ---------- */
  var contactList = $("#contact-links"), footerList = $("#footer-links");
  var ICON_PATHS = {
    mail: ["M3 6h18v12H3z", "M3 7l9 6 9-6"],
    gh: ["M9 19c-4 1.5-4-2-6-2.500", "M15 21v-3.500c0-1 .1-1.400-.5-2 2.8-.3 5.500-1.400 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.200 4.200 0 0 0-.1-3.200s-1-.3-3.400 1.300a11.800 11.800 0 0 0-6 0C6.800 2.8 5.800 3.100 5.800 3.100a4.200 4.200 0 0 0-.1 3.200A4.600 4.600 0 0 0 4.400 9.500c0 4.600 2.700 5.700 5.500 6-.6.600-.6 1.200-.5 2V21"],
    in: ["M4 9h4v11H4z", "M6 4.500a1.5 1.5 0 1 0 0 .1", "M10 9h4v1.5c.8-1.200 2-1.800 3.500-1.800 2.8 0 3.500 1.800 3.500 4.300V20h-4v-6c0-1.300-.4-2-1.5-2s-1.5.8-1.5 2v6h-4z"],
    wa: ["M21 11.5a8.400 8.400 0 0 1-12.400 7.400L3 20.500l1.600-5.400A8.400 8.400 0 1 1 21 11.5z", "M9 8.800c0 3.300 2.900 6.200 6.200 6.200l1.300-1.400-2-1-.9.800a4 4 0 0 1-2-2l.8-.9-1-2L9 8.800z"]
  };
  function addLink(label, text, href, external, icon, cls) {
    var a1 = el("a", { href: href, class: cls || "" }, [
      el("span", { class: "ico" }, [svg(ICON_PATHS[icon] || [])]),
      el("span", {}, [el("small", { text: label }), el("b", { text: text })])
    ]);
    var short = label.split(" \u2014")[0];
    var a2 = el("a", { href: href, text: (icon === "wa" || icon === "mail") ? short + ": " + text : short });
    if (external) [a1, a2].forEach(function (a) { a.target = "_blank"; a.rel = "noopener noreferrer"; });
    contactList.appendChild(el("li", {}, [a1])); footerList.appendChild(el("li", {}, [a2]));
  }
  var ghUser = /^[A-Za-z0-9-]{1,39}$/.test(S.github || "") ? S.github : "";
  var hasWa = /^\d{8,15}$/.test(S.whatsapp || "");
  var waHref = hasWa ? "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent("Hi Shahzaib, I found your portfolio and would like to connect.") : "";
  function fmtPhone(d) { return d.indexOf("92") === 0 && d.length === 12 ? "+92 " + d.slice(2, 5) + " " + d.slice(5) : "+" + d; }
  if (hasWa) addLink("WhatsApp — fastest reply", fmtPhone(S.whatsapp), waHref, true, "wa", "is-wa");
  if (S.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S.email)) addLink("Email", S.email, "mailto:" + S.email, false, "mail");
  if (ghUser) addLink("GitHub", "github.com/" + ghUser, "https://github.com/" + ghUser, true, "gh");
  if (safeUrl(S.linkedin)) addLink("LinkedIn", S.linkedin.replace(/^https?:\/\/(www\.)?/, ""), S.linkedin, true, "in");
  var waBtn = $("#wa-float");
  if (hasWa) {
    waBtn.href = waHref; waBtn.hidden = false;
    if ("IntersectionObserver" in window) {
      var seen = {};
      var wo = new IntersectionObserver(function (es) {
        es.forEach(function (en) { seen[en.target.id || "footer"] = en.isIntersecting; });
        waBtn.classList.toggle("is-hidden", !!(seen.contact || seen.footer));
      }, { threshold: 0.25 });
      wo.observe($("#contact")); wo.observe($(".footer"));
    }
  }
  if (!contactList.children.length) contactList.parentNode.removeChild(contactList);
  if (!footerList.children.length) footerList.parentNode.removeChild(footerList);
  $("#year").textContent = new Date().getFullYear();

  /* ---------- GitHub feed ---------- */
  if (ghUser && $("#github-content")) {
    var box = $("#github-content");
    box.textContent = "";
    box.appendChild(el("p", { class: "muted", text: "Loading repositories…" }));
    fetch("https://api.github.com/users/" + ghUser + "/repos?sort=pushed&per_page=30")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (repos) {
        repos = repos.filter(function (r) { return !r.fork && r.name !== ghUser; }).slice(0, 4);
        box.textContent = "";
        if (!repos.length) { box.appendChild(el("p", { class: "muted", text: "No public repositories yet." })); }
        else {
          var list = el("div", { class: "repos" });
          repos.forEach(function (r) {
            list.appendChild(el("a", { class: "repo", href: r.html_url, target: "_blank", rel: "noopener noreferrer" }, [
              el("b", { text: r.name }), el("span", { text: r.description || "No description" }),
              el("small", { text: [r.language, "Updated " + new Date(r.pushed_at).toLocaleDateString("en", { month: "short", year: "numeric" })].filter(Boolean).join(" · ") })
            ]));
          });
          box.appendChild(list);
        }
        box.appendChild(el("a", { class: "gh-link", href: "https://github.com/" + ghUser, target: "_blank", rel: "noopener noreferrer", text: "View full profile →" }));
      })
      .catch(function () {
        box.textContent = "";
        box.appendChild(el("p", { class: "muted", text: "Couldn't load repositories right now. " }));
        box.appendChild(el("a", { class: "gh-link", href: "https://github.com/" + ghUser, target: "_blank", rel: "noopener noreferrer", text: "View my GitHub profile →" }));
      });
  }

  /* ---------- Contact form ---------- */
  var form = $("#contact-form"), statusEl = $("#form-status"), submit = $("#f-submit");
  var RULES = {
    name: function (v) { return v.trim().length < 2 ? "Please enter your name." : ""; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."; },
    message: function (v) { return v.trim().length < 10 ? "Message should be at least 10 characters." : ""; }
  };
  function check(name) {
    var inp = form.elements[name], msg = RULES[name](inp.value);
    $("#e-" + name).textContent = msg;
    inp.closest(".field").classList.toggle("has-error", !!msg);
    inp.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) inp.setAttribute("aria-describedby", "e-" + name); else inp.removeAttribute("aria-describedby");
    return !msg;
  }
  Object.keys(RULES).forEach(function (n) {
    form.elements[n].addEventListener("blur", function () { check(n); });
    form.elements[n].addEventListener("input", function () { if (form.elements[n].closest(".field").classList.contains("has-error")) check(n); });
  });
  function status(kind, text, mailto) {
    statusEl.className = "form__status " + kind; statusEl.textContent = text;
    if (mailto) { statusEl.appendChild(document.createTextNode(" ")); statusEl.appendChild(el("a", { href: mailto, text: mailto.indexOf("wa.me") > -1 ? "Message me on WhatsApp." : "Email me directly instead." })); }
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = Object.keys(RULES).filter(function (n) { return !check(n); });
    if (bad.length) { form.elements[bad[0]].focus(); status("bad", "Please fix the highlighted fields."); return; }
    var payload = { type: form.elements.type.value, name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), message: form.elements.message.value.trim(), website: form.elements.website.value };
    var mailto = S.email ? "mailto:" + S.email + "?subject=" + encodeURIComponent("Project enquiry (" + payload.type + ") from " + payload.name) + "&body=" + encodeURIComponent(payload.message) : "";
    if (!S.contactEndpoint) {
      var body = "Project type: " + payload.type + "\n\n" + payload.message + "\n\n" + payload.name + " <" + payload.email + ">";
      var composed = "mailto:" + S.email + "?subject=" + encodeURIComponent("Project enquiry (" + payload.type + ") from " + payload.name) + "&body=" + encodeURIComponent(body);
      status("ok", "Opening your email app. If nothing opens,", composed);
      window.location.href = composed;
      return;
    }
    if (location.protocol === "file:" && S.contactEndpoint.charAt(0) === "/") {
      status("bad", "The form needs the web server (run npm start) or a hosted link. For now, reach me directly:", mailto || waHref);
      return;
    }
    submit.disabled = true; status("", "Sending…");
    fetch(S.contactEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (b) { if (!r.ok) throw new Error(b.error || "Request failed"); return b; }); })
      .then(function () { form.reset(); status("ok", "Thanks, " + payload.name.split(" ")[0] + "! Your message was sent."); })
      .catch(function (err) { status("bad", "Sorry, that didn't go through" + (err.message && err.message !== "Request failed" && err.message !== "Failed to fetch" ? " (" + err.message + ")" : "") + ".", mailto); })
      .then(function () { submit.disabled = false; });
  });

  /* ---------- Effects: spotlight, tilt, magnetic, counters ---------- */
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hero = $("#home");
  if (fine) {
    var spot = el("div", { class: "hero__spot", "aria-hidden": "true" }); hero.insertBefore(spot, hero.firstChild);
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      spot.style.setProperty("--sx", e.clientX - r.left + "px"); spot.style.setProperty("--sy", e.clientY - r.top + "px");
    });
    var por = $("#portrait"), fr = por && por.querySelector(".portrait__frame");
    if (por) {
      por.addEventListener("pointermove", function (e) {
        var r = por.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        fr.style.transform = "rotateY(" + x * 10 + "deg) rotateX(" + -y * 8 + "deg)";
      });
      por.addEventListener("pointerleave", function () { fr.style.transform = ""; });
    }
    [].slice.call(document.querySelectorAll(".btn--primary, .btn--ghost")).forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * .15 + "px," + (e.clientY - r.top - r.height / 2) * .25 + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }
  var counters = [].slice.call(document.querySelectorAll("[data-count]"));
  function runCount(n) {
    var to = +n.getAttribute("data-count"), suf = n.getAttribute("data-suffix") || "", t0 = null;
    function step(t) { t0 = t0 || t; var k = Math.min((t - t0) / 1100, 1); n.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + (k === 1 ? suf : ""); if (k < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var co = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); } }); }, { threshold: .6 });
    counters.forEach(function (n) { co.observe(n); });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (n) { io.observe(n); });
  } else reveals.forEach(function (n) { n.classList.add("is-in"); });
})();
