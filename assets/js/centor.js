(function () {
  const bannerEl = document.querySelector('.banner-swiper');
  if (bannerEl) {
    const slides = bannerEl.querySelectorAll('.banner-slide');
    if (slides.length < 2) {
      bannerEl.querySelectorAll('.swiper-button-prev,.swiper-button-next,.swiper-pagination')
        .forEach(n => { n.style.display = 'none'; });
    } else {
      new Swiper('.banner-swiper', {
        loop: true,
        speed: 800,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.banner-swiper .swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.banner-swiper .swiper-button-next',
          prevEl: '.banner-swiper .swiper-button-prev',
        },
      });
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Banner image lightbox
  const overlay = document.createElement('div');
  overlay.className = 'img-lightbox-overlay';
  overlay.innerHTML = '<button class="img-lightbox-close" aria-label="Close">&times;</button><img class="img-lightbox-img" src="" alt="Banner image" />';
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.img-lightbox-img');
  const lbClose = overlay.querySelector('.img-lightbox-close');

  function openLightbox(url) {
    lbImg.src = url.replace(/w=\d+/, 'w=2400');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  [
    { container: '.page-banner', slide: '.banner-slide' },
    { container: '.hero',        slide: '.hero-slide'   },
  ].forEach(function (cfg) {
    document.querySelectorAll(cfg.container).forEach(function (wrap) {
      wrap.addEventListener('click', function (e) {
        if (e.target.closest('.swiper-button-prev,.swiper-button-next,.swiper-pagination,.btn-gold,.btn-ghost,.hero-buttons,a,button')) return;
        const active = wrap.querySelector(cfg.slide + '.swiper-slide-active') || wrap.querySelector(cfg.slide);
        if (!active) return;
        const bg = active.style.backgroundImage || getComputedStyle(active).backgroundImage;
        const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
        if (match) openLightbox(match[1]);
      });
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
}());
