// Basic interactivity: mobile menu, smooth scroll, reveal on scroll, disabled tooltip
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'flex';
  });

  // smooth links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav
        if (window.innerWidth < 980 && nav) { nav.style.display = 'none'; menuToggle.setAttribute('aria-expanded', 'false'); }
      }
    });
  });

  // reveal on scroll (simple)
  const revealEls = document.querySelectorAll('.feature-card, .news-item, .download-card, .shot, .about-card');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'transform .6s cubic-bezier(.2,.9,.3,1),opacity .6s';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  revealEls.forEach(el => {
    el.style.transform = 'translateY(18px)';
    el.style.opacity = '0';
    obs.observe(el);
  });

  // Disabled 64-bit button tooltip
  const btn64 = document.getElementById('btn64');
  const tooltip = document.getElementById('tooltip');
  btn64 && btn64.addEventListener('mouseenter', () => {
    tooltip.textContent = '64-bit version currently unavailable.';
    tooltip.style.display = 'block';
  });
  btn64 && btn64.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
  btn64 && btn64.addEventListener('focus', () => { tooltip.style.display = 'block'; });
  btn64 && btn64.addEventListener('blur', () => { tooltip.style.display = 'none'; });

  // Accessibility: prevent action on disabled button
  btn64 && btn64.addEventListener('click', (e) => {
    e.preventDefault();
    // show tooltip briefly
    tooltip.textContent = '64-bit version currently unavailable.';
    tooltip.style.display = 'block';
    setTimeout(()=> tooltip.style.display = 'none', 1800);
  });

});
