$(document).ready(function(){

  // Smooth menu anumation

  $(".main_menu").on("click", "a", function(event){
    event.preventDefault();

    let id = $(this).attr("href");
    let top = $(id).offset().top;
   $("body, html").animate({
     scrollTop: top
   }, 500);
  });

  // Small device menu animation

  $(".burger_menu").click(function(){
    $(this).toggleClass("is_open");
    $(".main_menu_wrapper").toggleClass("visible");
  });


  // Button top animation
  let top_button = $(".top_button");

  $(window).scroll(function(){
    if ($(window).scrollTop() > "400" ){
      top_button.fadeIn();
      if ($(".main_menu_wrapper").hasClass("visible")){
        $(".main_menu_wrapper").removeClass("visible");
        $(".burger_menu").removeClass("is_open");
      }
    }else{
      top_button.fadeOut();
    }
  });

  top_button.click(function(){
    $("body, html").animate({
      scrollTop: 0
    }, 500);
  });

  // Gallery animation

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

});
