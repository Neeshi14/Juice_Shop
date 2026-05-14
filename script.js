/* =============================================
   ZESTIFY JUICE BAR — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- NAVBAR SCROLL EFFECT ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }

  /* ---- BACK TO TOP BUTTON ---- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- ACTIVE NAV LINK ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-links a');
  allNavLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---- MENU PAGE: CATEGORY TABS ---- */
  const menuTabs = document.getElementById('menuTabs');
  if (menuTabs) {
    const tabBtns   = menuTabs.querySelectorAll('.tab-btn');
    const categories = document.querySelectorAll('.menu-category');

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.getAttribute('data-category');

        // Update buttons
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Update categories
        categories.forEach(function (cat) {
          if (cat.id === target) {
            cat.classList.add('active');
          } else {
            cat.classList.remove('active');
          }
        });
      });
    });
  }

  /* ---- MENU PAGE: ORDER NOW TOAST ---- */
  window.orderNow = function (itemName, price) {
    const toast = document.getElementById('orderToast');
    if (!toast) return;
    toast.textContent = '🛒 ' + itemName + ' (' + price + ') added to cart!';
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 3000);
  };

  /* ---- GALLERY PAGE: FILTER ---- */
  const galleryFilters = document.getElementById('galleryFilters');
  if (galleryFilters) {
    const filterBtns  = galleryFilters.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        galleryItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
            item.style.animation = 'fadeIn 0.4s ease both';
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ---- GALLERY PAGE: LIGHTBOX ---- */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev  = document.getElementById('lightboxPrev');
  const lightboxNext  = document.getElementById('lightboxNext');

  if (lightbox) {
    let currentIndex = 0;
    let visibleItems = [];

    function getVisibleItems() {
      return Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
    }

    function openLightbox(index) {
      visibleItems = getVisibleItems();
      currentIndex = index;
      const item   = visibleItems[currentIndex];
      const img    = item.querySelector('img');
      const cap    = item.querySelector('.gallery-overlay span');
      lightboxImg.src       = img.src;
      lightboxImg.alt       = img.alt;
      lightboxCaption.textContent = cap ? cap.textContent : '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function showPrev() {
      visibleItems = getVisibleItems();
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      const item = visibleItems[currentIndex];
      lightboxImg.src = item.querySelector('img').src;
      const cap = item.querySelector('.gallery-overlay span');
      lightboxCaption.textContent = cap ? cap.textContent : '';
    }

    function showNext() {
      visibleItems = getVisibleItems();
      currentIndex = (currentIndex + 1) % visibleItems.length;
      const item = visibleItems[currentIndex];
      lightboxImg.src = item.querySelector('img').src;
      const cap = item.querySelector('.gallery-overlay span');
      lightboxCaption.textContent = cap ? cap.textContent : '';
    }

    document.querySelectorAll('.gallery-item').forEach(function (item, i) {
      item.addEventListener('click', function () {
        visibleItems = getVisibleItems();
        const idx = visibleItems.indexOf(item);
        if (idx !== -1) openLightbox(idx);
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev)  lightboxPrev.addEventListener('click', showPrev);
    if (lightboxNext)  lightboxNext.addEventListener('click', showNext);

    // Close on backdrop click
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   showPrev();
      if (e.key === 'ArrowRight')  showNext();
    });
  }

  /* ---- CONTACT FORM VALIDATION ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {

    function showError(inputId, errorId, message) {
      const input = document.getElementById(inputId);
      const error = document.getElementById(errorId);
      if (input) input.classList.add('error');
      if (error) error.textContent = message;
    }

    function clearError(inputId, errorId) {
      const input = document.getElementById(inputId);
      const error = document.getElementById(errorId);
      if (input) input.classList.remove('error');
      if (error) error.textContent = '';
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
      if (!phone) return true; // phone is optional
      return /^[\+]?[\d\s\-\(\)]{7,15}$/.test(phone);
    }

    // Real-time validation
    ['fullName', 'email', 'phone', 'message'].forEach(function (id) {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', function () {
          const errorId = id + 'Error';
          clearError(id, errorId.replace('fullName', 'name').replace('email','email').replace('phone','phone').replace('message','message'));
        });
      }
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const name    = document.getElementById('fullName').value.trim();
      const email   = document.getElementById('email').value.trim();
      const phone   = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      // Clear all errors
      clearError('fullName', 'nameError');
      clearError('email', 'emailError');
      clearError('phone', 'phoneError');
      clearError('message', 'messageError');

      if (!name || name.length < 2) {
        showError('fullName', 'nameError', 'Please enter your full name (min 2 characters).');
        valid = false;
      }

      if (!email) {
        showError('email', 'emailError', 'Email address is required.');
        valid = false;
      } else if (!validateEmail(email)) {
        showError('email', 'emailError', 'Please enter a valid email address.');
        valid = false;
      }

      if (phone && !validatePhone(phone)) {
        showError('phone', 'phoneError', 'Please enter a valid phone number.');
        valid = false;
      }

      if (!message || message.length < 10) {
        showError('message', 'messageError', 'Please enter a message (min 10 characters).');
        valid = false;
      }

      if (valid) {
        const submitBtn   = contactForm.querySelector('button[type="submit"]');
        const successMsg  = document.getElementById('formSuccess');

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate async send
        setTimeout(function () {
          contactForm.reset();
          submitBtn.textContent = 'Send Message 🍊';
          submitBtn.disabled = false;
          successMsg.classList.add('show');
          setTimeout(function () {
            successMsg.classList.remove('show');
          }, 5000);
        }, 1500);
      }
    });
  }

  /* ---- SCROLL REVEAL ANIMATION ---- */
  const revealEls = document.querySelectorAll(
    '.juice-card, .menu-card, .benefit-card, .mv-card, .review-card, .timeline-item, .gallery-item, .why-item, .stat-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease ' + (i % 4 * 0.08) + 's, transform 0.5s ease ' + (i % 4 * 0.08) + 's';
      observer.observe(el);
    });
  }

  /* ---- SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
