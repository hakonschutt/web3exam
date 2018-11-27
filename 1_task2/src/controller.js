const Controller = (function($) {
  const removeActiveClass = () => {
    const DOM = Module.getDOMstrings();

    Module.getData().forEach(item => {
      $(item.ids[0]).removeClass("active");
    });
  };

  const initHomePage = function() {
    const DOM = Module.getDOMstrings();
  };

  const setupEvents = function() {
    const items = Module.getData();

    items.forEach((item, index) => {
      item.ids.forEach(id => {
        $(id).on("click", event => {
          event.preventDefault();

          View.setPage("feed", () => {
            removeActiveClass();
            $(items[index].ids[0]).addClass("active");
          });
        });
      });
    });

    $(Module.getDOMstrings().homeBtn).on("click", event => {
      event.preventDefault();

      View.setPage("home", () => {
        removeActiveClass();
        initHomePage();
      });
    });
  };

  return {
    init() {
      setupEvents();

      View.setPage("home", () => {
        initHomePage();
      });
    }
  };
})(jQuery);
