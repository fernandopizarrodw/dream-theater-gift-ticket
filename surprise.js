// Botón sorpresa: muestra gif de oso millonario
(function () {
  function showSurprise() {
    let modal = document.getElementById('surpriseModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'surpriseModal';
      modal.innerHTML = `
        <div class="surprise-modal-bg"></div>
        <div class="surprise-modal-content">
          <img src="https://media.giphy.com/media/3o6MbhgBx0MaN0nOr6/giphy.gif" alt="Oso millonario" />
          <div class="surprise-msg">¡Feliz cumple, Vale! 🐻💸</div>
          <button class="btn" id="closeSurpriseBtn">Cerrar</button>
        </div>
      `;
      document.body.appendChild(modal);
      // Centrar modal en el viewport actual
      setTimeout(()=>{
        modal.scrollIntoView({behavior:'smooth', block:'center'});
      }, 100);
      document.getElementById('closeSurpriseBtn').onclick = () => modal.remove();
      modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }
  }
  window.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('surpriseBtn');
    if (btn) btn.addEventListener('click', showSurprise);
  });
})();
