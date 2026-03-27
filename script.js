// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
});

function animFollower() {
  fx += (mx - fx - 18) * 0.12;
  fy += (my - fy - 18) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animFollower);
}
animFollower();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .service-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    follower.style.transform = 'scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
  });
});

// ===== SKILL BARS ANIMATION ON SCROLL =====
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-fill').forEach(bar => {
  bar.style.animationPlayState = 'paused';
  skillObserver.observe(bar);
});

// ===== CONTACT FORM SUBMIT =====
document.querySelector('.form-submit').addEventListener('click', function () {
  this.textContent = '✅ Message Sent!';
  this.style.background = '#4ade80';
  setTimeout(() => {
    this.textContent = 'Send Message ✉️';
    this.style.background = 'var(--c1)';
  }, 3000);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(count) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(n => {
        const txt = n.textContent;
        if (txt.includes('5')) animateCounter(n, 5, '+');
        else if (txt.includes('3')) animateCounter(n, 3, '');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-stats').forEach(s => statsObserver.observe(s));

// ===== SMOOTH ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--c1)';
    }
  });
});
