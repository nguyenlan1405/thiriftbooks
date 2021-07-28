jQuery(function ($) {
  $().ready(function () {
    $.fn.editorPlusCounter = function runCounter() {
      let startnum = $(this).data("startnum");
      let endNum = $(this).data("endnum");
      let animduration = $(this).data("animduration");
      let animdurationfinal = animduration * 1000;
      const finalCounterElem = $(this).find(".ep_counter_number");

      var el = $(this);

      var top_of_element = el.offset().top;
      var bottom_of_element = el.offset().top + el.outerHeight();
      var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
      var top_of_screen = $(window).scrollTop();
      const isCounterVisible =
        bottom_of_screen > top_of_element && top_of_screen < bottom_of_element;
      const isAnimating = finalCounterElem.is(":animated");

      if (isAnimating) return;
      // checking if it's not currently being animated
      if (!isCounterVisible) return;
      // checking if it has not counted already
      const isAlreadyCounted = finalCounterElem.hasClass("ep-is-counted");
      if (isAlreadyCounted) return;

      finalCounterElem.prop("Counter", startnum).animate(
        {
          Counter: finalCounterElem.text(),
        },
        {
          duration: animdurationfinal,
          easing: "swing",
          triggerOnce: true,
          step: function (now) {
            finalCounterElem.text(Math.ceil(now));
          },
          complete: function () {
            finalCounterElem.addClass("ep-is-counted");
          },
        }
      );
    };

    let counter = $(".epc_num");

    counter.each(function () {
      const runCounters = () => {
        $(this).editorPlusCounter();
      };

      $(window).scroll(runCounters);
      $(window).on("load", runCounters);
    });
  });
});
