(function ($) {
  //------------------- ANIMATION ----------------------------//

  if (typeof window.editorPlusAnimationExtension === "undefined") {
    $().ready(function () {
      const editorPlusAnimationElements = $(
        '[class^="edplus_anim"], [class*=" edplus_anim"]'
      );

      editorPlusAnimationElements.css("opacity", "0");
      editorPlusAnimationElements.each(function () {
        const currentClass = $(this).attr("class");
        let matched = (currentClass.match(/(^|\s)edplus_anim\S+/g) || [])
          .map((c) => c.trim())
          .join(" ");
        $(this).data("ep-anim-class", matched);
      });

      editorPlusAnimationElements.removeClass(function (index, css) {
        return (css.match(/(^|\s)edplus_anim\S+/g) || []).join(" ");
      });

      editorPlusAnimationElements.each(function () {
        const self = $(this);

        self.on("animationstart", function () {
          $(this).css("opacity", "1");
        });

        function runAnimations() {
          var el = self;

          var top_of_element = el.offset().top;
          var bottom_of_element = el.offset().top + el.outerHeight();
          var bottom_of_screen =
            $(window).scrollTop() + $(window).innerHeight();
          var top_of_screen = $(window).scrollTop();

          if (
            bottom_of_screen > top_of_element &&
            top_of_screen < bottom_of_element &&
            !el.hasClass(el.data("ep-anim-class"))
          ) {
            el.addClass(el.data("ep-anim-class"));
          }
        }
        $(window).scroll(runAnimations);
        $(window).on("load", runAnimations);
      });
    });
  }

  //------------------- ANIMATION ----------------------------//
})(jQuery);
