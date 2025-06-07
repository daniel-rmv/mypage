document.addEventListener("DOMContentLoaded", () => {
  // === TYPEWRITER LOGIK ===
  const textElement = document.getElementById("typed-text");

  if (textElement) {
    const texts = [
      "Hallo, ich bin Daniel Würmli.",
      "Ich bin noch Schüler."
    ];

    let currentText = 0;
    let currentChar = 0;
    let deleting = false;
    let pauseEnd = false;

    function type() {
      const fullText = texts[currentText];

      if (!deleting && !pauseEnd) {
        textElement.textContent = fullText.substring(0, currentChar + 1);
        currentChar++;
        if (currentChar === fullText.length) {
          pauseEnd = true;
          setTimeout(() => {
            deleting = true;
            pauseEnd = false;
            type();
          }, 2500);
          return;
        }
      } else if (deleting && !pauseEnd) {
        textElement.textContent = fullText.substring(0, currentChar - 1);
        currentChar--;
        if (currentChar === 0) {
          deleting = false;
          currentText = (currentText + 1) % texts.length;
          pauseEnd = true;
          setTimeout(() => {
            pauseEnd = false;
            type();
          }, 1500);
          return;
        }
      }

      if (!pauseEnd) {
        setTimeout(type, deleting ? 70 : 120);
      }
    }

    type();
  }

  // === KONTAKTFORMULAR LOGIK ===
  const form = document.getElementById("contactForm");

  if (form) {
    document.getElementById("startTime").value = Date.now();

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const honeypot = document.getElementById("website").value;
      const startTime = parseInt(document.getElementById("startTime").value);
      const elapsed = Date.now() - startTime;

      if (honeypot) {
        alert("Bot erkannt – Formular wird nicht gesendet.");
        return;
      }

      if (elapsed < 3000) {
        alert("Formular wurde zu schnell ausgefüllt – bist du ein Bot?");
        return;
      }

      const subject = encodeURIComponent(document.getElementById("subject").value);
      const name = encodeURIComponent(document.getElementById("name").value);
      const date = document.getElementById("date").value;
      const message = document.getElementById("message").value;

      const fullMessage = `${message}\n\nLiebe Grüsse\n${decodeURIComponent(name)} (${date})`;

      const mailtoLink = `mailto:daniel@example.com?subject=${subject}&body=${encodeURIComponent(fullMessage)}`;

      window.location.href = mailtoLink;
    });
  }
});