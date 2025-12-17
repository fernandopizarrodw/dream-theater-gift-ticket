// Confetti animation for the ticket
(function () {
  function randomColor() {
    const colors = [
      '#a7ff7a', '#7adfff', '#ff7adf', '#fff47a', '#ff7a7a', '#b47aff', '#7affb4'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.background = randomColor();
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
    confetti.style.opacity = 0.7 + Math.random() * 0.3;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    return confetti;
  }

  function launchConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    for (let i = 0; i < 96; i++) {
      const piece = createConfettiPiece();
      container.appendChild(piece);
    }
    setTimeout(() => {
      container.remove();
    }, 4000);
  }

  window.launchConfetti = launchConfetti;

  // Auto-launch on load
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(launchConfetti, 600);
  });
})();
