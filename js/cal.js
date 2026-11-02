/* Calendrier Cal.com intégré, aux couleurs de la charte (code d'intégration officiel de Cal.com) */
(function (C, A, L) {
  var p = function (a, ar) { a.q.push(ar); };
  var d = C.document;
  C.Cal = C.Cal || function () {
    var cal = C.Cal; var ar = arguments;
    if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
    if (ar[0] === L) {
      var api = function () { p(api, arguments); };
      var namespace = ar[1]; api.q = api.q || [];
      if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); }
      else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");

function calendrierVictor(idConteneur, lienCal) {
  var ns = idConteneur;
  Cal("init", ns, { origin: "https://app.cal.com" });
  var conteneur = document.getElementById(idConteneur);
  conteneur.innerHTML = "";
  Cal.ns[ns]("inline", {
    elementOrSelector: "#" + idConteneur,
    calLink: lienCal,
    config: { layout: "month_view", theme: "light" }
  });
  Cal.ns[ns]("ui", {
    theme: "light",
    hideEventTypeDetails: false,
    layout: "month_view",
    cssVarsPerTheme: {
      light: {
        "cal-brand": "#14213D",
        "cal-brand-emphasis": "#1d2f55",
        "cal-brand-text": "#FFFBF5",
        "cal-brand-subtle": "#D6EEFB",
        "cal-text": "#14213D",
        "cal-text-emphasis": "#14213D",
        "cal-text-subtle": "#14213D",
        "cal-text-muted": "#4a5672",
        "cal-bg": "#FFFBF5",
        "cal-bg-muted": "#FBEFE6",
        "cal-bg-subtle": "#D6EEFB",
        "cal-bg-emphasis": "#D6EEFB",
        "cal-border": "#d9dde6",
        "cal-border-subtle": "#e7e3dc",
        "cal-border-booker": "#FFFBF5"
      }
    }
  });
}
