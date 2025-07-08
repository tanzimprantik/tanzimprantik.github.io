// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Scroll to Top Button
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
