document.addEventListener('DOMContentLoaded', () => {

  // ── PRELOADER
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => { setTimeout(() => preloader.classList.add('hidden'), 600); });
  setTimeout(() => preloader.classList.add('hidden'), 2500);

  // ── CUSTOM CURSOR
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
  function animateRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animateRing); }
  animateRing();

  // ── NAVBAR
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => { const y = window.scrollY; navbar.classList.toggle('scrolled', y > 50); backTop.classList.toggle('visible', y > 400); updateActiveNav(); });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop; const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) { navLinks.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + section.id); }); }
    });
  }

  // ── MOBILE MENU
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');
  menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
  document.querySelectorAll('.mob-link').forEach(link => { link.addEventListener('click', () => mobileMenu.classList.remove('open')); });

  // ── SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => { const target = document.querySelector(anchor.getAttribute('href')); if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
  });

  // ── REVEAL ON SCROLL
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  // ── COUNTER ANIMATION
  function animateCounter(el, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);
    const tick = () => { start = Math.min(start + step, target); el.textContent = Math.floor(start); if (start < target) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-target]').forEach(num => { animateCounter(num, parseInt(num.dataset.target)); });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.hero-stats, .metrics-grid, .proj-stats-bar').forEach(el => counterObserver.observe(el));

  // ── TYPED TEXT
  const phrases = ['Cloud Computing', 'Artificial Intelligence', 'Fog & IoT Networks', 'Blockchain Systems', 'Energy Informatics', 'Computational Intelligence'];
  let pIdx = 0, cIdx = 0, deleting = false;
  const typedEl = document.getElementById('typedText');
  function type() {
    if (!typedEl) return;
    const phrase = phrases[pIdx];
    if (!deleting) { typedEl.textContent = phrase.substring(0, cIdx + 1); cIdx++; if (cIdx === phrase.length) { deleting = true; setTimeout(type, 1800); return; } }
    else { typedEl.textContent = phrase.substring(0, cIdx - 1); cIdx--; if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; } }
    setTimeout(type, deleting ? 55 : 85);
  }
  setTimeout(type, 1000);

  // ── PUB FILTERS
  const filters = document.querySelectorAll('.pub-filter');
  const pubItems = document.querySelectorAll('.pub-item');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      pubItems.forEach(item => {
        const match = filter === 'all' || item.dataset.type === filter;
        item.classList.toggle('hidden', !match);
        if (match) { item.style.animation = 'none'; item.offsetHeight; item.style.animation = 'fadeInUp 0.4s ease forwards'; }
      });
    });
  });

  // ── PROJECT FILTERS
  const projFilters = document.querySelectorAll('.proj-filter');
  const projCards = document.querySelectorAll('.proj-card');
  projFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      projFilters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const pfilter = btn.dataset.pfilter;
      projCards.forEach(card => {
        let show = false;
        if (pfilter === 'all') show = true;
        else if (pfilter === 'pi') show = card.dataset.prole === 'pi';
        else if (pfilter === 'copi') show = card.dataset.prole === 'copi';
        else if (pfilter === 'active') show = card.dataset.pstatus === 'active';
        else if (pfilter === 'completed') show = card.dataset.pstatus === 'completed';
        card.classList.toggle('hidden', !show);
        if (show) { card.style.animation = 'none'; card.offsetHeight; card.style.animation = 'fadeInUp 0.4s ease forwards'; }
      });
    });
  });

  const style = document.createElement('style');
  style.textContent = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: none; } }`;
  document.head.appendChild(style);

  // ── EXPERIENCE TABS
  const expTabs = document.querySelectorAll('.exp-tab');
  const acTl = document.getElementById('academicTimeline');
  const adTl = document.getElementById('adminTimeline');
  expTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      expTabs.forEach(t => t.classList.remove('active')); tab.classList.add('active');
      if (tab.dataset.tab === 'academic') { acTl.classList.remove('hidden'); adTl.classList.add('hidden'); }
      else { acTl.classList.add('hidden'); adTl.classList.remove('hidden'); adTl.querySelectorAll('.reveal').forEach(el => { el.classList.remove('visible'); setTimeout(() => el.classList.add('visible'), 80); }); }
    });
  });

  // ── CONTACT FORM
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…'; btn.disabled = true;
    setTimeout(() => { btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>'; btn.disabled = false; form.reset(); successMsg.classList.remove('hidden'); setTimeout(() => successMsg.classList.add('hidden'), 5000); }, 1500);
  });

  // ── PARALLAX ORBS
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelectorAll('.orb').forEach((orb, i) => { const f = (i + 1) * 0.3; orb.style.transform = `translate(${x * f}px, ${y * f}px)`; });
  });

  // ── RESEARCH CARD TILT
  document.querySelectorAll('.research-card').forEach(card => {
    card.addEventListener('mousemove', e => { const rect = card.getBoundingClientRect(); const cx = (e.clientX - rect.left) / rect.width - 0.5; const cy = (e.clientY - rect.top) / rect.height - 0.5; card.style.transform = `translateY(-6px) rotateX(${-cy * 6}deg) rotateY(${cx * 6}deg)`; });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // ── PROJECT CARD TILT
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => { const rect = card.getBoundingClientRect(); const cx = (e.clientX - rect.left) / rect.width - 0.5; const cy = (e.clientY - rect.top) / rect.height - 0.5; card.style.transform = `translateY(-6px) rotateX(${-cy * 4}deg) rotateY(${cx * 4}deg)`; });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  console.log('Portfolio loaded — Dr. Chandrashekar Jatoth, NIT Raipur');
});
