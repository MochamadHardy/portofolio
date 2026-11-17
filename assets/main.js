/**
 * Mochamad Hardy - Fullstack Developer Portfolio
 * Main Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
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

  // 2. Navbar Background Blur & Shadow on Scroll
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // 3. ScrollSpy (Active Navigation Link on Scroll)
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
  window.addEventListener('scroll', handleScrollSpy);

  // 4. Scroll Reveal Animations (IntersectionObserver)
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
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

  // 5. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
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

  // 5.b Skill Filter Tabs
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

  // 6. Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'hardy@example.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalHtml = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
        copyEmailBtn.style.background = '#10b981';
        copyEmailBtn.style.color = '#ffffff';

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalHtml;
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.color = '';
        }, 2200);
      });
    });
  }

  // 7. Interactive Contact Form -> Direct WhatsApp Forwarding
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const messageInput = document.getElementById('formMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menghubungkan ke WhatsApp...';
      submitBtn.disabled = true;

      // WhatsApp Destination Number
      const waNumber = '6281573692697';

      // Format Message
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
          Jika chat tidak otomatis terbuka, <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline; font-weight: 600;">klik di sini untuk langsung chat</a>.
        `;

        // Open WhatsApp in new tab
        window.open(waUrl, '_blank');

        contactForm.reset();

        setTimeout(() => {
          formFeedback.style.display = 'none';
          formFeedback.className = 'form-feedback';
        }, 10000);
      }, 500);
    });
  }

  // 8. Dynamic Image vs Placeholder Handling for Project Mockups
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

    // If already loaded from cache or failed immediately
    if (img.complete) {
      if (img.naturalWidth > 0) {
        showImage();
      } else {
        showPlaceholder();
      }
    }
  });

  // 9. Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
});
