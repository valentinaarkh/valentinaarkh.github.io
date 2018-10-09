$('.gallery_slider_large').slick({
 slidesToShow: 1,
 slidesToScroll: 1,
 arrows: false,
 fade: true,
 asNavFor: '.gallery_slider'
});
$('.gallery_slider').slick({
 slidesToShow: 3,
 slidesToScroll: 1,
 asNavFor: '.gallery_slider_large',
 dots: true,
 centerMode: true,
 focusOnSelect: true
});

$(".burger_menu").click(function(){
  $(this).toggleClass("is_open");
  $(".main_menu_wrapper").toggleClass("visible");
});
