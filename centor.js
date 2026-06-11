(function(){
  var el = document.querySelector('.banner-swiper');
  if(!el) return;
  var slides = el.querySelectorAll('.banner-slide');
  if(slides.length < 2){
    el.querySelectorAll('.swiper-button-prev,.swiper-button-next,.swiper-pagination').forEach(function(n){ n.style.display='none'; });
    return;
  }
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
})();
