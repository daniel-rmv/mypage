// Warten bis die komplette Seite geladen ist
document.addEventListener("DOMContentLoaded", () => {

    // Holt das HTML-Element mit der ID "typed-text", in dem der Text geschrieben wird
    const textElement = document.getElementById("typed-text");
  
    // Die Texte, die getippt und gelöscht werden sollen
    const texts = [
      "Hallo, ich bin Daniel Würmli.",
      "Ich bin noch Schüler."
    ];
  
    // Index für den aktuell angezeigten Text aus dem Array
    let currentText = 0;
  
    // Position des aktuellen Buchstabens im aktuellen Text
    let currentChar = 0;
  
    // Gibt an, ob der Text gerade gelöscht wird
    let deleting = false;
  
    // Kontrolliert, ob wir gerade eine Pause nach dem Schreiben/Löschen machen
    let pauseEnd = false;
  
    // Hauptfunktion für das Tippen & Löschen
    function type() {
      // Holt den kompletten Text, der gerade dran ist
      const fullText = texts[currentText];
  
      // Wenn wir schreiben (nicht löschen) und keine Pause aktiv ist
      if (!deleting && !pauseEnd) {
        // Setzt den Text von Anfang bis zum aktuellen Buchstaben
        textElement.textContent = fullText.substring(0, currentChar + 1);
  
        // Einen Buchstaben weiter
        currentChar++;
  
        // Wenn der ganze Text fertig geschrieben ist
        if (currentChar === fullText.length) {
          // Aktiviert die Pause
          pauseEnd = true;
  
          // Nach 2.5 Sekunden (2500 ms) fängt das Löschen an
          setTimeout(() => {
            deleting = true;    // Löschen beginnt
            pauseEnd = false;   // Pause ist vorbei
            type();             // Starte wieder den Typing-Prozess
          }, 2500);
  
          // Beendet den aktuellen Funktionslauf hier (wartet auf Timeout)
          return;
        }
      }
  
      // Wenn gerade gelöscht wird und keine Pause ist
      else if (deleting && !pauseEnd) {
        // Setzt den Text bis zu einem Buchstaben weniger
        textElement.textContent = fullText.substring(0, currentChar - 1);
  
        // Geht einen Buchstaben zurück
        currentChar--;
  
        // Wenn der Text komplett gelöscht wurde
        if (currentChar === 0) {
          deleting = false; // Nicht mehr löschen
          currentText = (currentText + 1) % texts.length; // Nächster Text aus dem Array
          pauseEnd = true; // Neue Pause vor dem Tippen
  
          // Warte 1.5 Sekunden (1500 ms), bevor du mit dem nächsten Text beginnst
          setTimeout(() => {
            pauseEnd = false;
            type(); // Startet wieder mit dem Schreiben
          }, 1500);
  
          return; // Beendet den aktuellen Funktionslauf
        }
      }
  
      // Wenn wir nicht gerade pausieren, machen wir weiter mit dem Tippen oder Löschen
      if (!pauseEnd) {
        // Setzt den nächsten Funktionsaufruf je nach Modus (schneller beim Löschen)
        setTimeout(type, deleting ? 70 : 120);
      }
    }
  
    // Startet das Tippen beim Laden der Seite
    type();
  });