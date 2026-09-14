(function () {
  var page = document.querySelector('.page');
  var glow = document.getElementById('glow');
  var themeToggle = document.getElementById('themeToggle');
  var themeLabel = document.getElementById('themeLabel');

  var dark = false;

  themeToggle.addEventListener('click', function () {
    dark = !dark;
    page.classList.toggle('dark', dark);
    themeLabel.textContent = dark ? 'Lys' : 'Mørk';
  });

  window.addEventListener('pointermove', function (e) {
    var w = window.innerWidth || 1;
    var h = window.innerHeight || 1;
    glow.style.left = (e.clientX / w) * 100 + '%';
    glow.style.top = (e.clientY / h) * 100 + '%';
  }, { passive: true });
})();
