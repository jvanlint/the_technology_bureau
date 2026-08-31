/* The Technology Bureau — small progressive-enhancement script */
(function () {
  "use strict";

  /* ---- Current year in footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Header shadow on scroll ---- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile navigation ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    var setNav = function (open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setNav(false);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealTargets = document.querySelectorAll(
    ".section-head, .card, .area, .hero-panel, .about-points li, .cta-box"
  );
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduce && "IntersectionObserver" in window) {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Contact form: compose a mailto (no backend required) ---- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var get = function (id) {
        var f = document.getElementById(id);
        return f ? f.value.trim() : "";
      };
      var name = get("name");
      var company = get("company");
      var email = get("email");
      var message = get("message");

      var subject = "Technology Health Check request" + (company ? " — " + company : "");
      var bodyLines = [
        "Name: " + name,
        "Company: " + company,
        "Email: " + email,
        "",
        "What's prompting the conversation:",
        message || "(not provided)"
      ];

      var href =
        "mailto:jason.van.lint@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = href;

      var existing = form.querySelector(".form-status");
      if (!existing) {
        var status = document.createElement("p");
        status.className = "form-status";
        status.setAttribute("role", "status");
        status.textContent =
          "Thanks, " + (name || "there") + " — your email app should now open with the details ready to send.";
        form.appendChild(status);
      }
    });
  }
})();
