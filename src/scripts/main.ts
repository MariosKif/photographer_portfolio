import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import { Navigation, Pagination, Parallax, Autoplay, Grid } from 'swiper/modules';
import GLightbox from 'glightbox';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import 'glightbox/dist/css/glightbox.min.css';

gsap.registerPlugin(ScrollTrigger);

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavigation();
  initHeroSwiper();
  initAboutSwiper();
  initServicesSwiper();
  initWorksSwiper();
  initNewsSwiper();
  initLightbox();
  initAnimations();
  initNewsPanels();
  initContactModal();
  initContactForm();
});

// ===== 1. Preloader =====
function initPreloader() {
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const preloaderBg = document.querySelector('.preloader-bg') as HTMLElement;

    if (preloader) {
      gsap.to(preloader, { opacity: 0, duration: 0.6, onComplete: () => { preloader.style.display = 'none'; } });
    }
    if (preloaderBg) {
      gsap.to(preloaderBg, { opacity: 0, duration: 0.6, delay: 0.4, onComplete: () => { preloaderBg.style.display = 'none'; } });
    }

    // Fade in elements
    setTimeout(() => {
      document.querySelectorAll('.fadeIn-element').forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.display = 'block';
        gsap.fromTo(htmlEl, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.6 });
      });
    }, 0);
  });
}

// ===== 2. Navigation =====
function initNavigation() {
  const navIcon = document.getElementById('navigation-icon');
  const navFire = document.querySelector('.navigation-fire') as HTMLElement;
  const navMenu = document.querySelector('nav.navigation-menu') as HTMLElement;

  if (navIcon && navFire && navMenu) {
    navIcon.addEventListener('click', () => {
      navIcon.classList.toggle('active');
    });

    navFire.addEventListener('click', () => {
      navFire.classList.toggle('open');
      navMenu.classList.toggle('show');
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navFire.classList.remove('open');
        navIcon.classList.remove('active');
      });
    });
  }

  // Active state
  document.querySelectorAll('a.menu-state').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('a.menu-state').forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Hover state with images
  document.querySelectorAll('.menu li a').forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const ref = (link as HTMLElement).dataset.ref;
      const menuImg = document.querySelector(`.menu-img[data-ref="${ref}"]`);
      document.querySelectorAll('.menu li a').forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
      document.querySelectorAll('.menu-img').forEach((img) => img.classList.remove('active'));
      if (menuImg) menuImg.classList.add('active');
    });
  });

  // Hamburger line transforms when active
  if (navIcon) {
    const lines = navIcon.querySelectorAll('.line');
    const observer = new MutationObserver(() => {
      if (navIcon.classList.contains('active')) {
        if (lines[0]) (lines[0] as HTMLElement).style.transform = 'translateY(11px)';
        if (lines[2]) (lines[2] as HTMLElement).style.transform = 'translateY(-11px)';
      } else {
        if (lines[0]) (lines[0] as HTMLElement).style.transform = '';
        if (lines[2]) (lines[2] as HTMLElement).style.transform = '';
      }
    });
    observer.observe(navIcon, { attributes: true, attributeFilter: ['class'] });
  }
}

// ===== 3. Hero Swiper =====
function initHeroSwiper() {
  const swiperEl = document.querySelector('.hero-swiper');
  if (!swiperEl) return;

  const swiper = new Swiper('.hero-swiper', {
    modules: [Navigation, Pagination, Parallax, Autoplay],
    preloadImages: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: false,
    speed: 1200,
    grabCursor: true,
    parallax: true,
    effect: 'slide',
    pagination: {
      el: '.swiper-slide-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.slide-next',
      prevEl: '.slide-prev',
    },
  });

  // Progress bar
  const progressBar = document.querySelector('.slider-progress-bar');
  swiper.on('slideChangeTransitionStart', () => {
    if (progressBar) progressBar.classList.remove('slider-active');
  });
  swiper.on('slideChangeTransitionEnd', () => {
    if (progressBar) progressBar.classList.add('slider-active');
  });

  // Play/Pause
  const playButton = document.querySelector('.swiper-slide-controls-play-pause-wrapper');
  if (playButton) {
    playButton.addEventListener('click', () => {
      if (playButton.classList.contains('slider-on-off')) {
        playButton.classList.remove('slider-on-off');
        swiper.autoplay.stop();
      } else {
        playButton.classList.add('slider-on-off');
        swiper.autoplay.start();
      }
    });
  }
}

// ===== 4. About Swiper =====
function initAboutSwiper() {
  const el = document.querySelector('.about-content-swiper');
  if (!el) return;

  new Swiper('.about-content-swiper', {
    modules: [Navigation],
    slidesPerView: 1,
    speed: 500,
    allowTouchMove: false,
    navigation: {
      nextEl: '.about-swiper .swiper-button-next',
      prevEl: '.about-swiper .swiper-button-prev',
    },
  });
}

// ===== 5. Services Swiper =====
function initServicesSwiper() {
  ['.services-swiper-1', '.services-swiper-2'].forEach((selector) => {
    if (!document.querySelector(selector)) return;
    new Swiper(selector, {
      modules: [Navigation],
      slidesPerView: 1,
      loop: true,
      speed: 500,
      navigation: {
        nextEl: `${selector} .swiper-button-next`,
        prevEl: `${selector} .swiper-button-prev`,
      },
    });
  });
}

// ===== 6. Works Swiper =====
function initWorksSwiper() {
  const el = document.querySelector('.works-swiper');
  if (!el) return;

  new Swiper('.works-swiper', {
    modules: [Navigation, Grid],
    slidesPerView: 2,
    grid: {
      rows: 2,
      fill: 'row',
    },
    spaceBetween: 0,
    speed: 450,
    navigation: {
      nextEl: '.works-swiper .swiper-button-next',
      prevEl: '.works-swiper .swiper-button-prev',
    },
    breakpoints: {
      880: {
        slidesPerView: 3,
        grid: { rows: 2, fill: 'row' },
      },
    },
  });
}

// ===== 7. News Swiper =====
function initNewsSwiper() {
  const el = document.querySelector('.news-swiper');
  if (!el) return;

  new Swiper('.news-swiper', {
    modules: [Navigation],
    slidesPerView: 1,
    loop: true,
    speed: 450,
    navigation: {
      nextEl: '.news-swiper .swiper-button-next',
      prevEl: '.news-swiper .swiper-button-prev',
    },
    breakpoints: {
      880: { slidesPerView: 2 },
      1170: { slidesPerView: 3 },
    },
  });
}

// ===== 8. Lightbox =====
function initLightbox() {
  GLightbox({
    selector: '.popup-photo',
    touchNavigation: true,
    loop: true,
    closeEffect: 'fade',
    openEffect: 'fade',
  });
}

// ===== 9. Animations (Skills + Counters) =====
function initAnimations() {
  // Skill bars
  document.querySelectorAll('.skillbar').forEach((bar) => {
    const percent = parseInt((bar as HTMLElement).dataset.percent || '0', 10);
    const barFill = bar.querySelector('.skillbar-bar') as HTMLElement;
    const percentLabel = bar.querySelector('.skill-bar-percent') as HTMLElement;

    if (barFill && percentLabel) {
      ScrollTrigger.create({
        trigger: bar,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(barFill, {
            width: `${percent}%`,
            duration: 4,
            ease: 'power2.out',
          });
          const counter = { val: 0 };
          gsap.to(counter, {
            val: percent,
            duration: 4,
            ease: 'power2.out',
            onUpdate: () => {
              percentLabel.textContent = `${Math.round(counter.val)}%`;
            },
          });
        },
      });
    }
  });

  // Fact counters
  document.querySelectorAll('.facts-counter-number').forEach((el) => {
    const target = parseInt((el as HTMLElement).dataset.target || el.textContent || '0', 10);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = String(Math.round(counter.val));
          },
        });
      },
    });
  });
}

// ===== 10. News Panels =====
function initNewsPanels() {
  document.querySelectorAll('.c-btn-news').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dataId = (btn as HTMLElement).dataset.id;
      if (!dataId) return;

      const panelLeft = document.querySelector(`.${dataId}.panel-left`);
      const panelRight = document.querySelector(`.${dataId}.panel-right`);

      if (panelLeft) panelLeft.classList.add('open');
      if (panelRight) panelRight.classList.add('open');

      // Scroll to news section top
      const newsWrapper = document.querySelector('.news-page-img-wrapper');
      if (newsWrapper) {
        newsWrapper.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Close buttons
  document.querySelectorAll('.inverse-dark').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.panel-left, .panel-right').forEach((panel) => {
        panel.classList.remove('open');
      });
    });
  });
}

// ===== 11. Contact Modal =====
function initContactModal() {
  const modal = document.querySelector('.contact-modal');
  if (!modal) return;

  const open = () => {
    modal.classList.remove('close');
    modal.classList.add('open');
  };

  const close = () => {
    modal.classList.remove('open');
    modal.classList.add('close');
  };

  document.querySelectorAll('.contact-modal-launcher').forEach((el) => {
    el.addEventListener('click', () => {
      if (modal.classList.contains('open')) {
        close();
      } else {
        open();
      }

      // Scroll to contact reset
      const resetEl = document.querySelector('.contact-reset');
      if (resetEl) resetEl.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.contact-modal-closer').forEach((el) => {
    el.addEventListener('click', close);
  });

  // Additional closers
  const navIcon = document.querySelector('.navigation-icon');
  const logo = document.querySelector('.logo');
  if (navIcon) navIcon.addEventListener('click', close);
  if (logo) logo.addEventListener('click', close);
}

// ===== 12. Contact Form (Web3Forms) =====
function initContactForm() {
  const form = document.getElementById('form') as HTMLFormElement;
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Remove previous errors
    form.querySelectorAll('.error').forEach((el) => el.remove());
    form.querySelectorAll('.inputError').forEach((el) => el.classList.remove('inputError'));

    let hasError = false;

    form.querySelectorAll('.requiredField').forEach((field) => {
      const input = field as HTMLInputElement | HTMLTextAreaElement;
      const value = input.value.trim();

      if (value === '') {
        const parent = input.parentElement;
        if (parent) {
          const errorSpan = document.createElement('span');
          errorSpan.className = 'error';
          errorSpan.textContent = 'This field is required';
          parent.appendChild(errorSpan);
        }
        input.classList.add('inputError');
        hasError = true;
      } else if (input.classList.contains('email')) {
        const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailRegex.test(value)) {
          const parent = input.parentElement;
          if (parent) {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error';
            errorSpan.textContent = 'Invalid email address';
            parent.appendChild(errorSpan);
          }
          input.classList.add('inputError');
          hasError = true;
        }
      }
    });

    if (hasError) return;

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      formData.append('access_key', '40774e53-c2c3-47e0-ae92-8ee82760c880');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = 'Your message has been sent successfully.';
        form.parentElement?.insertBefore(successDiv, form);
        gsap.to(form, { height: 0, opacity: 0, duration: 0.3, onComplete: () => { form.style.display = 'none'; } });
      } else {
        alert('Error: ' + data.message);
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
