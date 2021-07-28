jQuery(function ($) {
  $().ready(function () {
    let toggles = $(".ep_toggle_item_wrapper");

    toggles.each(function (idx) {
      let self = $(this);
      let parent = $(this).parents(".ep_toggles_wrapper");
      let isAccordion = parent.data("isaccordion");

      const toggleTitle = $(this).find(".ep_toggle_item_title");
      const toggleContent = $(this).find(".ep_toggle_item_content");
      const openFirst = parent.data("open_first");

      if (!openFirst || idx !== 0) {
        toggleContent.slideToggle(0);
      } else if (openFirst && idx === 0) {
        toggleContent.slideDown(0);
        self.toggleClass("ep_ti_open");

        // switching the icon to the active one
        let toggleIconElem = toggleTitle.find(".ep_toggles_icon");
        let toggleActiveIcon = toggleIconElem.data("activeicon");

        toggleIconElem.addClass(toggleActiveIcon);
      }

      toggleTitle.click(function () {
        toggleContent.slideToggle("fast");
        self.toggleClass("ep_ti_open");

        const toggleIconElem = $(this).find(".ep_toggles_icon");

        let toggleActiveIcon = toggleIconElem.data("activeicon");
        let toggleIcon = toggleIconElem.data("icon");

        if (self.hasClass("ep_ti_open")) {
          toggleIconElem.addClass(toggleActiveIcon);
          toggleIconElem.removeClass(toggleIcon);
        } else {
          toggleIconElem.removeClass(toggleActiveIcon);
          toggleIconElem.addClass(toggleIcon);
        }

        if (isAccordion) {
          toggles
            .find(".ep_toggle_item_content")
            .not(toggleContent)
            .slideUp("fast");
          // removing active classes from other toggles
          toggles
            .find(".ep_toggle_item_title")
            .not(this)
            .parents(".ep_toggle_item_wrapper")
            .removeClass("ep_ti_open");

          // switching other tabs icon to the in active one
          toggles
            .find(".ep_toggle_item_title")
            .not(this)
            .find(".ep_toggles_icon")
            .each(function () {
              let inactiveIcon = $(this).data("icon");
              let activeIcon = toggleIconElem.data("activeicon");
              $(this).addClass(inactiveIcon);
              $(this).removeClass(activeIcon);
            });
        }
      });
    });
  });
});
