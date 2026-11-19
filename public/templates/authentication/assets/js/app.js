/*
 * Authentication template — client-side behaviour.
 * This file handles UI only: validation, password visibility and messages.
 * It does NOT create accounts, sign anyone in, store passwords or send email.
 *
 * INTEGRATION POINTS (search for "CONNECT"):
 *  1. submitToBackend()  — send the form to your auth service (Firebase, Supabase, Auth0, your API).
 *  2. socialLogin()      — start Google / Facebook OAuth with your provider's SDK.
 */
(function () {
  "use strict";

  // CONNECT 1: replace the body with a real request, e.g.
  //   return fetch("/api/login", { method: "POST", body: JSON.stringify(data) })
  function submitToBackend(formType, data) {
    return Promise.resolve({ demo: true, formType: formType, data: data });
  }

  // CONNECT 2: call your provider here, e.g. Firebase signInWithPopup(new GoogleAuthProvider())
  function socialLogin(provider) {
    return Promise.resolve({ demo: true, provider: provider });
  }

  var form = document.getElementById("auth-form");
  if (!form) return;
  var status = form.querySelector(".status");

  function setStatus(text, type) {
    status.textContent = text;
    status.className = "status " + (type || "");
  }

  function setError(input, message) {
    var box = document.getElementById(input.id + "-error");
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (box) {
      box.textContent = message;
      if (message) input.setAttribute("aria-describedby", box.id);
    }
  }

  function validate(input) {
    var v = input.value.trim();
    var msg = "";
    if (input.required && !v) msg = "This field is required.";
    else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      msg = "Enter a valid email address.";
    else if (input.type === "password" && input.minLength > 0 && v.length < input.minLength)
      msg = "Use at least " + input.minLength + " characters.";
    else if (input.id === "confirm" && v !== form.password.value) msg = "Passwords do not match.";
    setError(input, msg);
    return !msg;
  }

  // Password show/hide
  form.querySelectorAll("[data-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var input = document.getElementById(btn.dataset.toggle);
      var show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.textContent = show ? "Hide" : "Show";
      btn.setAttribute("aria-pressed", String(show));
      btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  });

  // Password strength (sign-up)
  var meter = document.getElementById("strength");
  if (meter) {
    form.password.addEventListener("input", function () {
      var p = form.password.value,
        s = 0;
      if (p.length >= 8) s++;
      if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
      if (/\d/.test(p)) s++;
      if (/[^A-Za-z0-9]/.test(p)) s++;
      meter.style.width = s * 25 + "%";
      meter.style.background = s < 2 ? "var(--danger)" : s < 4 ? "var(--brand)" : "var(--ok)";
    });
  }

  form.querySelectorAll("input:not([type=checkbox])").forEach(function (input) {
    input.addEventListener("blur", function () {
      if (input.value) validate(input);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var inputs = form.querySelectorAll("input:not([type=checkbox])");
    var ok = true,
      first = null;
    inputs.forEach(function (i) {
      if (!validate(i)) {
        ok = false;
        first = first || i;
      }
    });
    var terms = form.querySelector("[name=terms]");
    if (terms && !terms.checked) {
      ok = false;
      setStatus("Please accept the terms to continue.", "info");
    }
    if (!ok) {
      if (first) first.focus();
      return;
    }
    var data = Object.fromEntries(new FormData(form));
    delete data.password;
    delete data.confirm; // never log or store passwords in the browser
    submitToBackend(form.dataset.form, data).then(function (res) {
      if (res && res.demo)
        setStatus(
          "Form is valid. Template preview only — connect submitToBackend() in assets/js/app.js to go live.",
          "ok",
        );
    });
  });

  document.querySelectorAll("[data-provider]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      socialLogin(btn.dataset.provider).then(function (res) {
        if (res && res.demo)
          setStatus(
            btn.textContent.trim() +
              ": template preview only — connect socialLogin() in assets/js/app.js.",
            "info",
          );
      });
    });
  });
})();
