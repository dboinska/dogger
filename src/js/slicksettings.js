$('#customers-carousel').slick({
  arrows: true,
  autoplay: false,
  mobileFirst: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 992,
      settings: { slidesToShow: 3 },
    },
  ],
  nextArrow: document.querySelector('.slick-next'),
  prevArrow: document.querySelector('.slick-prev'),
});
