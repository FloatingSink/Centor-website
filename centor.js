(function(){
  var el = document.querySelector('.banner-swiper');
  if(el) {
    var slides = el.querySelectorAll('.banner-slide');
    if(slides.length < 2){
      el.querySelectorAll('.swiper-button-prev,.swiper-button-next,.swiper-pagination').forEach(function(n){ n.style.display='none'; });
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

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(en) {
      if(en.isIntersecting) {
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });
  document.querySelectorAll('.fade-up').forEach(function(el){ io.observe(el); });

  // Language switcher dropdown
  var ls = document.getElementById('lang-switcher');
  if(ls) {
    var lb = document.getElementById('lang-btn');
    lb.addEventListener('click', function(e) {
      e.stopPropagation();
      var open = ls.classList.toggle('open');
      lb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function() {
      ls.classList.remove('open');
      lb.setAttribute('aria-expanded', 'false');
    });
  }
})();
