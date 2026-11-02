/* Formulaire de rétractation : envoie la demande au script Google (Apps Script),
   qui l'enregistre et envoie aussitôt l'accusé de réception daté. */
(function () {
  var ADRESSE_SCRIPT = "ADRESSE_APPS_SCRIPT";

  var form = document.getElementById("retractation");
  var bouton = document.getElementById("envoyer");
  var erreur = document.getElementById("erreur");
  var confirmation = document.getElementById("confirmation");

  function afficherErreur(texte) {
    erreur.textContent = texte;
    erreur.hidden = false;
    erreur.focus && erreur.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    erreur.hidden = true;

    var champs = ["nom", "email", "prestation", "date-commande"];
    for (var i = 0; i < champs.length; i++) {
      var el = document.getElementById(champs[i]);
      if (!el.value.trim() || !el.checkValidity()) {
        el.focus();
        afficherErreur(champs[i] === "email" && el.value.trim()
          ? "Vérifie ton adresse e-mail, il semble manquer quelque chose."
          : "Il manque une information : ton nom, ton e-mail, la prestation ou la date de ta commande.");
        return;
      }
    }

    var donnees = {
      nom: form.nom.value.trim(),
      email: form.email.value.trim(),
      prestation: form.prestation.value,
      dateCommande: form.dateCommande.value,
      precisions: form.precisions.value.trim(),
      siteWeb: form.siteWeb.value
    };

    bouton.disabled = true;
    bouton.textContent = "Envoi en cours…";

    fetch(ADRESSE_SCRIPT, { method: "POST", body: JSON.stringify(donnees) })
      .then(function (r) { return r.json(); })
      .then(function (rep) {
        if (!rep.ok) throw new Error(rep.erreur || "refus");
        form.hidden = true;
        confirmation.textContent = "C'est bien enregistré : ta rétractation est datée du " + rep.date + " à " + rep.heure +
          ". Un accusé de réception vient de t'être envoyé à " + donnees.email + ".";
        confirmation.hidden = false;
        confirmation.focus();
      })
      .catch(function () {
        bouton.disabled = false;
        bouton.textContent = "Confirmer la rétractation";
        afficherErreur("L'envoi n'a pas fonctionné. Réessaie dans un instant, ou écris-moi à bonjour@victoramilien.fr : ta demande sera prise en compte à la date de ton e-mail.");
      });
  });
})();
