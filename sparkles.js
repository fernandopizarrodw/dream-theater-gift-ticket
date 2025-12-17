// Sparkles (lucecitas) animadas en el ticket
(function () {
  function createSparkle() {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = (10 + Math.random() * 70) + 'vh';
    s.style.animationDuration = (0.9 + Math.random() * 0.7) + 's';
    s.style.opacity = 0.7 + Math.random() * 0.3;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
  setInterval(() => {
    for (let i = 0; i < 3; i++) createSparkle();
  }, 700);
})();
