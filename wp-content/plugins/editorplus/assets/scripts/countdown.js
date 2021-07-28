(function ($) {
  $().ready(function () {
    $(".ep_countdown_wrapper").each(function () {


      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      let event = $(this).data('date'),
        countDown = new Date(event).getTime(),
        x = setInterval(() => {
          let now = new Date().getTime(),
            distance = countDown - now;


          $(this).find(".ep_cd_days").html(Math.floor(
            distance / day
          ));

          $(this).find(".ep_cd_hours").html(Math.floor(
            (distance % day) / hour
          ));
           
          $(this).find(".ep_cd_minutes").html(Math.floor(
            (distance % hour) / minute
          ));
           
          $(this).find(".ep_cd_seconds").html(Math.floor(
            (distance % minute) / second
          ));
           
          let countdown = $(this);
           
          if (distance < 0) {
            countdown.css('display','none');

            clearInterval(x);
          } else {
            countdown.css('display', 'block')
          }
          //seconds
        }, 0);
    });
  });
})(jQuery);
