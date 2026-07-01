/* ================================================================
   PORTFOLIO — MAIN JAVASCRIPT
   ดีนาน น้ำจันทร์ | IT Student, SBAC
   
   Features:
   1.  Scroll Progress Bar
   2.  Navbar scroll shadow + active link highlight
   3.  Mobile hamburger menu
   4.  Typing animation (hero section)
   5.  Scroll reveal animations (IntersectionObserver)
   6.  Copy email to clipboard button
   7.  Back to top button
   8.  Smooth anchor scrolling (polyfill for older browsers)
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==============================================================
     1. SCROLL PROGRESS BAR
  ============================================================== */
  const progressBar = document.getElementById('progress-bar');

  function updateProgressBar() {
    const scrollTop     = window.scrollY;
    const docHeight     = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateProgressBar, { passive: true });


  /* ==============================================================
     2. NAVBAR — shadow on scroll + active link highlight
  ============================================================== */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);

    let currentSection = '';
    sections.forEach(section => {
      const top    = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();


  /* ==============================================================
     3. MOBILE HAMBURGER MENU
  ============================================================== */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });


  /* ==============================================================
     4. TYPING ANIMATION
     ✏️  แก้ phrases[] เพื่อเปลี่ยนข้อความที่พิมพ์วนซ้ำ
  ============================================================== */
  const typedText = document.getElementById('typed-text');

  const phrases = [
    'write HTML & CSS.',
    'build IoT systems.',
    'love IT support.',
    'create games.',
    'learn every day.',
  ];

  let phraseIndex   = 0;
  let charIndex     = 0;
  let isDeleting    = false;
  const typeSpeed   = 80;
  const deleteSpeed = 45;
  const pauseAfter  = 1600;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      typedText.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, pauseAfter);
        return;
      }
      setTimeout(typeLoop, typeSpeed);
    } else {
      typedText.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, deleteSpeed);
    }
  }

  setTimeout(typeLoop, 800);


  /* ==============================================================
     5. SCROLL REVEAL ANIMATIONS
  ============================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // Reveal hero elements immediately on load
  setTimeout(() => {
    revealElements.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);


  /* ==============================================================
     6. COPY EMAIL TO CLIPBOARD
  ============================================================== */
  const copyBtn   = document.getElementById('copy-btn');
  const copyLabel = document.getElementById('copy-label');
  const emailText = document.getElementById('email-text');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent.trim())
        .then(() => {
          copyBtn.classList.add('copied');
          copyLabel.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyLabel.textContent = 'Copy';
          }, 2000);
        })
        .catch(() => {
          copyLabel.textContent = 'Failed';
          setTimeout(() => { copyLabel.textContent = 'Copy'; }, 2000);
        });
    });
  }


  /* ==============================================================
     7. BACK TO TOP BUTTON
  ============================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ==============================================================
     8. SMOOTH ANCHOR SCROLLING (คำนึง navbar height)
  ============================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();
      const navHeight      = navbar.offsetHeight;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });


}); // end DOMContentLoaded
