/* Minimal but useful interactions:
   - Smooth scrolling
   - Module progress saved to localStorage
   - Basic contact form client-side stub
*/

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Module progress handling
  const moduleIds = ['m1','m2','m3','m4','m5','m6'];
  const progressKey = 'fxportfolio_module_progress';

  function loadProgress(){
    const raw = localStorage.getItem(progressKey);
    return raw ? JSON.parse(raw) : {};
  }
  function saveProgress(state){
    localStorage.setItem(progressKey, JSON.stringify(state));
  }
  function updateUI(){
    const state = loadProgress();
    let doneCount = 0;
    moduleIds.forEach(id => {
      const btn = document.querySelector(`.mark-btn[data-id="${id}"]`);
      if (!btn) return;
      const marked = !!state[id];
      btn.classList.toggle('marked', marked);
      btn.textContent = marked ? 'Completed' : 'Mark done';
      if (marked) doneCount++;
    });
    const pct = Math.round((doneCount/moduleIds.length)*100);
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('progressText').textContent = `${doneCount} / ${moduleIds.length} modules completed`;
  }

  // Wire mark buttons
  document.querySelectorAll('.mark-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const state = loadProgress();
      state[id] = !state[id];
      saveProgress(state);
      updateUI();
    });
  });

  // Reset progress
  const resetBtn = document.getElementById('resetProgress');
  if(resetBtn){
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem(progressKey);
      updateUI();
    });
  }

  updateUI();

  // Contact form (client-side stub)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const status = document.getElementById('formStatus');

      if(!name || !email || !message){
        status.textContent = 'Please complete all fields.';
        setTimeout(()=> status.textContent = '', 3500);
        return;
      }

      // Replace this with real backend or email integration later
      status.textContent = 'Thanks — message saved locally (demo).';
      setTimeout(()=> status.textContent = '', 3000);
      form.reset();
    });
  }

  // Menu toggle (small screens)
  const menuToggle = document.getElementById('menuToggle');
  if(menuToggle){
    menuToggle.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      if(nav) nav.style.display = (nav.style.display === 'flex' ? 'none' : 'flex');
    });
  }
});
