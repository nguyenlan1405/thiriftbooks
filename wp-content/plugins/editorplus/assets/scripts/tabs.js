jQuery(function ($) {
  $.fn.editorPlusTabsAutoplay = function () {
    const self = $(this);
    let delay = $(this).data("delay");

    delay = (delay * 1000) | 0;

    const navigateToNextTab = () => {
      let currentTab = $(this).find(".ep_tabs_header .ep_active_tab");
      let currentTabContent = $(currentTab.attr("href"));

      // removing active class from the current tab header

      let nextTabHeader = currentTab.next();
      let nextTabContent = $(nextTabHeader.attr("href"));

      if (!nextTabHeader.length && !nextTabContent.length) {
        nextTabHeader = $(this).find(".ep_tabs_header .ep_label_main").eq(0);
        nextTabContent = $(nextTabHeader.attr("href"));
      }

      if (nextTabHeader.length && nextTabContent.length) {
        nextTabHeader.addClass("ep_active_tab");
        nextTabContent.fadeIn("fast");

        currentTab.removeClass("ep_active_tab");
        currentTabContent.hide();
      }
    };

    let autoplayInterval = setInterval(navigateToNextTab, delay);

    $(this).hover(
      function () {
        clearInterval(autoplayInterval);
      },
      function () {
        autoplayInterval = setInterval(navigateToNextTab, delay);
      }
    );
  };

  $(".ep_tabs_root").each(function () {
    $(this).find(".ep_tab_item_wrapper").hide();
    $(this).find(".ep_tab_item_wrapper:first").show();
    $(this).find(".ep_tabs_header a:first").addClass("ep_active_tab");

    const mainLabel = $(this).find(".ep_label_main");
    const isAutoplay = $(this).data("autoplay");

    mainLabel.hover(function () {
      $(this).find("span").triggerHandler("mouseover");
    });

    const self = $(this);

    $(this)
      .find(".ep_tabs_header a")
      .each(function (idx) {
        if (idx !== 0) {
          $(this).removeClass("ep_active_tab");
        }

        $(this).click(function (e) {
          e.preventDefault();

          self.find(".ep_tabs_header a").removeClass("ep_active_tab");

          $(this).removeClass("ep_active_tab");
          $(this).addClass("ep_active_tab");

          self.find(".ep_tab_item_wrapper").hide();
          self.find($(this).attr("href")).fadeIn("fast");
        });
      });

    if (isAutoplay) {
      $(this).editorPlusTabsAutoplay();
    }
  });
});
