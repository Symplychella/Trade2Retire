document.addEventListener('DOMContentLoaded', () => {
 
  /* ---------- Mobile sidebar ---------- */
  const burger = document.getElementById('burgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
 
  function toggleSidebar(open) {
    sidebar.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
  }
 
  if (burger) burger.addEventListener('click', () => toggleSidebar(true));
  if (overlay) overlay.addEventListener('click', () => {
    toggleSidebar(false);
    closeAllDropdowns();
  });
 
  /* ---------- Notification & profile dropdowns ---------- */
  const notifBtn = document.getElementById('notifBtn');
  const notifPanel = document.getElementById('notifPanel');
  const profileBtn = document.getElementById('profileBtn');
  const profilePanel = document.getElementById('profilePanel');
 
  function closeAllDropdowns() {
    notifPanel.classList.remove('open');
    profilePanel.classList.remove('open');
  }
 
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !notifPanel.classList.contains('open');
    closeAllDropdowns();
    if (willOpen) notifPanel.classList.add('open');
  });
 
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !profilePanel.classList.contains('open');
    closeAllDropdowns();
    if (willOpen) profilePanel.classList.add('open');
  });
 
  // Close dropdowns when clicking anywhere else
  document.addEventListener('click', closeAllDropdowns);
 
  // Prevent clicks inside the panels from closing them immediately
  notifPanel.addEventListener('click', (e) => e.stopPropagation());
  profilePanel.addEventListener('click', (e) => e.stopPropagation());
 
  /* ---------- Animate course progress bars ---------- */
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const target = bar.getAttribute('data-target');
    requestAnimationFrame(() => { bar.style.width = target + '%'; });
  });
 
  /* ---------- Animate circular stat rings ---------- */
  const CIRCUMFERENCE = 2 * Math.PI * 50; // r = 50
  document.querySelectorAll('.ring-fill').forEach(ring => {
    const pct = parseFloat(ring.getAttribute('data-pct')) || 0;
    const offset = CIRCUMFERENCE - (CIRCUMFERENCE * pct) / 100;
    ring.style.strokeDasharray = `${CIRCUMFERENCE}`;
    ring.style.strokeDashoffset = `${CIRCUMFERENCE}`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ring.style.strokeDashoffset = `${offset}`;
      });
    });
  });
 
  /* ---------- Animated count-up helper ---------- */
  function countUp(el, target, duration = 1200) {
    if (!el) return;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }
 
  countUp(document.getElementById('streakNum'), 14, 1400);
  countUp(document.getElementById('progressNum'), 68, 1400);
  countUp(document.getElementById('rankNum'), 92, 1400);
 
  /* ---------- Hero subtitle typewriter effect ---------- */
  const heroTyped = document.getElementById('heroTyped');
  if (heroTyped) {
    const fullText = "You're 68% through the AI Trading Masterclass. Keep the streak going — consistency compounds, just like your trades should.";
    let i = 0;
    function typeChar() {
      if (i <= fullText.length) {
        heroTyped.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeChar, 18);
      } else {
        heroTyped.classList.add('typing-done');
      }
    }
    setTimeout(typeChar, 500);
  }
 
  /* ---------- Subtle parallax on hero background ---------- */
  const hero = document.getElementById('hero');
  const heroBg = hero ? hero.querySelector('.hero-bg') : null;
  if (hero && heroBg) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroBg.style.transform = `scale(1.08) translate(${x * -14}px, ${y * -14}px)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroBg.style.transform = 'scale(1.08) translate(0,0)';
    });
  }
 
  /* ---------- Scroll-reveal for cards ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), idx * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }
 
  /* ---------- Sidebar active state ---------- */
  document.querySelectorAll('.side-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.side-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if (window.innerWidth <= 900) toggleSidebar(false);
    });
  });
});