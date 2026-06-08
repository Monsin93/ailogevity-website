// ===== SHARED COMPONENTS =====
document.addEventListener('DOMContentLoaded', () => {
  // Background atmosphere
  const bg = document.createElement('div');
  bg.className = 'bg-atmosphere';
  bg.innerHTML = `
    <div class="bg-grid"></div>
    <div class="bg-glow cyan"></div>
    <div class="bg-glow purple"></div>
    <div class="bg-glow violet"></div>
  `;
  document.body.insertBefore(bg, document.body.firstChild);

  const path = window.location.pathname.split('/').pop() || 'index.html';
  const page = path.replace('.html', '');

  // Navigation (no Partners — merged into About)
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="logo">
        <img src="assets/logo-mark.png" alt="AI Longevity" class="logo-img">
        <span>AI Longevity</span>
      </a>
      <div class="nav-links">
        <a href="about.html" ${page === 'about' ? 'class="active"' : ''}>About</a>
        <a href="technology.html" ${page === 'technology' ? 'class="active"' : ''}>Technology</a>
        <a href="services.html" ${page === 'services' ? 'class="active"' : ''}>Services</a>
        <a href="team.html" ${page === 'team' ? 'class="active"' : ''}>Team</a>
      </div>
      <div class="nav-actions">
        <a href="contact.html" class="btn-primary">Contact</a>
      </div>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild.nextSibling);

  // Nav scroll state
  const onNavScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onNavScroll();
  window.addEventListener('scroll', onNavScroll, { passive: true });

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <img src="assets/logo-mark.png" alt="AI Longevity" class="logo-img">
            <span>AI Longevity</span>
          </a>
          <p>AI-guided drug discovery and nanoformulation. Bangkok, Thailand.</p>
        </div>
        <div class="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="technology.html">Technology</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="team.html">Team</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>Bangkok, Thailand</li>
            <li><a href="mailto:info@ailongevity-tech.com">info@ailongevity-tech.com</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 AI LONGEVITY CO., LTD. · REG. NO. 0105569053122</span>
        <div class="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);

  // Scroll-triggered reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ---- Fail-safes: never leave content invisible if CSS animations / IO
  //      don't run (some embedded/preview contexts throttle them) ----
  const heroAnimated = '.hero-tag, .hero h1, .hero p.lead, .hero-ctas, .hero-bg-video';
  function revealAll() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
    document.querySelectorAll(heroAnimated).forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  }
  // reveal anything already in view immediately
  document.querySelectorAll('.reveal').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) el.classList.add('visible');
  });
  // hard fallback after entrance window
  setTimeout(revealAll, 1500);

  // Slow, cinematic hero video
  document.querySelectorAll('.hero-bg-video video, .hero-video-container video').forEach(v => {
    const slow = () => { try { v.playbackRate = 0.6; } catch (e) {} };
    v.addEventListener('loadedmetadata', slow); slow();
    const p = v.play(); if (p && p.catch) p.catch(() => {});
  });
});
