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
}());
