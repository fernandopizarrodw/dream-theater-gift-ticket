// Cuenta regresiva para el show (24 abril 2026, 21:00 hora Buenos Aires)
(function () {
  const showDate = new Date('2026-04-24T21:00:00-03:00');
  function updateCountdown() {
    const now = new Date();
    let diff = showDate - now;
    if (diff < 0) diff = 0;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    const el = document.getElementById('countdownTimer');
    if (el) {
      el.textContent = `${d.toString().padStart(2,'0')}d ${h.toString().padStart(2,'0')}h ${m.toString().padStart(2,'0')}m ${s.toString().padStart(2,'0')}s`;
    }
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();
})();
