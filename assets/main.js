/**
 * Mochamad Hardy - Fullstack Developer Portfolio
 * Advanced Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. MOBILE MENU TOGGLE
  // =========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const toggleIcon = mobileToggle ? mobileToggle.querySelector('i') : null;

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);

      if (toggleIcon) {
        if (isOpen) {
          toggleIcon.classList.remove('fa-bars');
          toggleIcon.classList.add('fa-xmark');
        } else {
          toggleIcon.classList.remove('fa-xmark');
          toggleIcon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (toggleIcon) {
          toggleIcon.classList.remove('fa-xmark');
          toggleIcon.classList.add('fa-bars');
        }
      });
    });
  }

  // =========================================================================
  // 2. NAVBAR BLUR & SCROLL PROGRESS BAR
  // =========================================================================
  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  const handleNavAndProgress = () => {
    // Navbar glass effect
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Top Reading Scroll Progress Bar
    if (scrollProgressBar) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      scrollProgressBar.style.width = `${scrolled}%`;
    }
  };

  window.addEventListener('scroll', handleNavAndProgress, { passive: true });
  handleNavAndProgress();

  // =========================================================================
  // 3. SCROLLSPY (ACTIVE NAV LINK HIGHLIGHT)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  // =========================================================================
  // 4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // =========================================================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px',
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    animatedElements.forEach((el) => {
      appearOnScroll.observe(el);
    });
  } else {
    // Fallback for older browsers
    animatedElements.forEach((el) => el.classList.add('animated'));
  }

  // =========================================================================
  // 5. HERO DYNAMIC TYPEWRITER EFFECT
  // =========================================================================
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const roles = [
      'Fullstack Web Developer',
      'Laravel & Vue.js Specialist',
      'Python Flask & MySQL Architect',
      'REST API & System Integrator',
      'Clean Code & Scalable Solutions',
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 80;

    const runTypewriter = () => {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeDelay = 35;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeDelay = 75;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typeDelay = 2000; // Pause when full word is typed
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeDelay = 450; // Pause before typing next word
      }

      setTimeout(runTypewriter, typeDelay);
    };

    // Small initial delay before typing starts
    setTimeout(runTypewriter, 500);
  }

  // =========================================================================
  // 6. ANIMATED NUMBER COUNTERS (HERO STATS)
  // =========================================================================
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let current = 0;
          const duration = 1600;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = `${target}${suffix}`;
              clearInterval(counter);
            } else {
              el.textContent = `${Math.floor(current)}${suffix}`;
            }
          }, stepTime);

          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((el) => countObserver.observe(el));
  }

  // =========================================================================
  // 7. 3D TILT & MAGNETIC MOUSE-FOLLOW SPOTLIGHT (DESKTOP)
  // =========================================================================
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (supportsFinePointer) {
    const interactiveCards = document.querySelectorAll(
      '.tilt-card, .spotlight-card, .tech-card, .project-card, .service-card, .pillar-card'
    );

    interactiveCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Dynamic Spotlight coordinate variables
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D perspective tilt
        if (card.classList.contains('tilt-card') || card.classList.contains('avatar-frame-wrapper')) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = -((y - centerY) / centerY) * 7.5;
          const rotateY = ((x - centerX) / centerX) * 7.5;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (card.classList.contains('tilt-card') || card.classList.contains('avatar-frame-wrapper')) {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      });
    });
  }

  // =========================================================================
  // 8. INTERACTIVE PROJECT SCREENSHOT LIGHTBOX / MODAL
  // =========================================================================
  const lightbox = document.getElementById('projectLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxLiveBtn = document.getElementById('lightboxLiveBtn');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const mockupFrames = document.querySelectorAll('.mockup-frame[data-lightbox-src]');

  const openLightbox = (src, title, category, link) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCategory) lightboxCategory.textContent = category;

    if (lightboxLiveBtn) {
      if (link && link !== '#') {
        lightboxLiveBtn.href = link;
        lightboxLiveBtn.style.display = 'inline-flex';
      } else {
        lightboxLiveBtn.style.display = 'none';
      }
    }

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  mockupFrames.forEach((frame) => {
    frame.addEventListener('click', (e) => {
      // Prevent interfering with links inside mockup if any
      if (e.target.closest('a')) return;
      const src = frame.getAttribute('data-lightbox-src');
      const title = frame.getAttribute('data-lightbox-title') || 'Project Preview';
      const category = frame.getAttribute('data-lightbox-category') || 'Featured Project';
      const link = frame.getAttribute('data-lightbox-link') || '';
      openLightbox(src, title, category, link);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // =========================================================================
  // 9. PROJECT FILTER TABS
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // =========================================================================
  // 10. SKILL FILTER TABS
  // =========================================================================
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.tech-card');

  if (skillFilterBtns.length && skillCards.length) {
    skillFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        skillFilterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-skill-filter');

        skillCards.forEach((card) => {
          const category = card.getAttribute('data-skill-category') || '';
          if (filterValue === 'all' || category.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // =========================================================================
  // 11. REAL-TIME WHATSAPP MESSAGE PREVIEW & CHARACTER COUNTER
  // =========================================================================
  const formName = document.getElementById('formName');
  const formEmail = document.getElementById('formEmail');
  const formMessage = document.getElementById('formMessage');
  const waBubbleContent = document.getElementById('waBubbleContent');
  const charCounter = document.getElementById('charCounter');
  const waBubbleTime = document.getElementById('waBubbleTime');

  // Clock time in WA bubble
  const updateWaTime = () => {
    if (!waBubbleTime) return;
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    waBubbleTime.innerHTML = `${hrs}:${mins} <i class="fa-solid fa-check-double wa-check"></i>`;
  };
  updateWaTime();

  const updateWaPreview = () => {
    if (!waBubbleContent) return;
    const name = formName ? formName.value.trim() : '';
    const email = formEmail ? formEmail.value.trim() : '';
    const msg = formMessage ? formMessage.value.trim() : '';

    if (charCounter && formMessage) {
      charCounter.textContent = `${formMessage.value.length} / 500`;
      if (formMessage.value.length > 450) {
        charCounter.style.color = '#ef4444';
      } else {
        charCounter.style.color = 'var(--text-subtle)';
      }
    }

    if (!name && !email && !msg) {
      waBubbleContent.innerHTML = `<span class="wa-placeholder-text">Ketik nama dan pesan Anda di atas untuk melihat preview pesan yang akan terkirim secara otomatis...</span>`;
      return;
    }

    const displaySender = name || '[Nama Anda]';
    const displayEmail = email || '[Email Anda]';
    const displayMsg = msg || '[Pesan / Kebutuhan Proyek]';

    waBubbleContent.innerHTML =
      `Halo Mochamad Hardy, saya menghubungi melalui portfolio website Anda:<br/><br/>` +
      `👤 <strong>Nama:</strong> ${displaySender}<br/>` +
      `📧 <strong>Email:</strong> ${displayEmail}<br/><br/>` +
      `💬 <strong>Pesan:</strong><br/>${displayMsg.replace(/\n/g, '<br/>')}<br/><br/>` +
      `<em>Terima kasih!</em>`;
  };

  if (formName) formName.addEventListener('input', updateWaPreview);
  if (formEmail) formEmail.addEventListener('input', updateWaPreview);
  if (formMessage) formMessage.addEventListener('input', updateWaPreview);

  // =========================================================================
  // 12. COPY EMAIL TO CLIPBOARD WITH MICRO-ANIMATION
  // =========================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'hardysafaryherawan@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalHtml = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
        copyEmailBtn.classList.add('copied');

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalHtml;
          copyEmailBtn.classList.remove('copied');
        }, 2200);
      });
    });
  }

  // =========================================================================
  // 13. DIRECT WHATSAPP FORM SUBMISSION
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = formName ? formName.value.trim() : '';
      const email = formEmail ? formEmail.value.trim() : '';
      const message = formMessage ? formMessage.value.trim() : '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menghubungkan ke WhatsApp...';
      submitBtn.disabled = true;

      // WhatsApp Destination Number
      const waNumber = '6281573692697';

      // Format Message with bold Markdown
      const waText =
        `Halo Mochamad Hardy, saya menghubungi melalui portfolio website Anda:\n\n` +
        `👤 *Nama:* ${name}\n` +
        `📧 *Email:* ${email}\n\n` +
        `💬 *Pesan / Detail Kebutuhan:*\n${message}\n\n` +
        `Terima kasih!`;

      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <strong><i class="fa-brands fa-whatsapp"></i> Membuka WhatsApp...</strong><br/>
          Jika chat tidak otomatis terbuka, <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: underline; font-weight: 600;">klik di sini untuk langsung membuka chat</a>.
        `;

        // Open WhatsApp in new tab
        window.open(waUrl, '_blank');

        contactForm.reset();
        updateWaPreview();

        setTimeout(() => {
          formFeedback.style.display = 'none';
          formFeedback.className = 'form-feedback';
        }, 10000);
      }, 500);
    });
  }

  // =========================================================================
  // 14. BUTTON CLICK RIPPLE EFFECT
  // =========================================================================
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const circle = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple-circle');

    const prevRipple = btn.querySelector('.ripple-circle');
    if (prevRipple) prevRipple.remove();

    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });

  // =========================================================================
  // 15. DYNAMIC IMAGE VS PLACEHOLDER HANDLING FOR PROJECT MOCKUPS
  // =========================================================================
  const mockupImages = document.querySelectorAll('.mockup-img');
  mockupImages.forEach((img) => {
    const parent = img.parentElement;
    const placeholder = parent ? parent.querySelector('.mockup-placeholder') : null;

    const showImage = () => {
      img.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    };

    const showPlaceholder = () => {
      img.style.display = 'none';
      if (placeholder) placeholder.style.display = 'flex';
    };

    img.addEventListener('load', showImage);
    img.addEventListener('error', showPlaceholder);

    if (img.complete) {
      if (img.naturalWidth > 0) {
        showImage();
      } else {
        showPlaceholder();
      }
    }
  });

  // =========================================================================
  // 16. BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      },
      { passive: true }
    );

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // =========================================================================
  // 17. DARK & LIGHT THEME SWITCHER
  // =========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeToggle.setAttribute('title', 'Ganti ke tema gelap');
        themeToggle.setAttribute('aria-label', 'Ganti ke tema gelap');
      } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeToggle.setAttribute('title', 'Ganti ke tema terang');
        themeToggle.setAttribute('aria-label', 'Ganti ke tema terang');
      }
    }
  };

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
});
