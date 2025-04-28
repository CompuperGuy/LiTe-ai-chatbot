document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('main-container').classList.remove('hidden');
  }, 2500); 
});
