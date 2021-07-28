jQuery(function ($) {
  $().ready(function () {
    let bars = $(".progress_bar_wrapper");

    bars.each(function () {
      let percentage = $(this).data("eppercentage");
      let epdpercentage = $(this).data("epdpercentage");

      let fill = $(this).find(".ep_pb");
      let self = $(this);
      fill.css("width", "0%");

      function runProgress() {
        var el = self;

        var top_of_element = el.offset().top;
        var bottom_of_element = el.offset().top + el.outerHeight();
        var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        var top_of_screen = $(window).scrollTop();

        if (
          bottom_of_screen > top_of_element &&
          top_of_screen < bottom_of_element
        ) {
          fill.css("transition", "none");

          fill.animate(
            {
              width: percentage + "%",
            },
            {
              duration: 2000,
              step: function (now, fx) {
                const newPercentage = Math.floor(now) + "%";
                if (epdpercentage === true) {
                  fill.find(".ep_pb_percentage").html(newPercentage);
                }
              },
            }
          );
        }
      }

      $(window).scroll(runProgress);
      $(window).on("load", runProgress);
    });
  });
});
