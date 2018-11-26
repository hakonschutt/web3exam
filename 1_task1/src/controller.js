const Controller = (function($) {
  const initVg = feed => {
    console.log("VG");
  };

  const initNrk = feed => {
    console.log("NRK");
  };

  const initReddit = feed => {
    console.log("REDDIT");
  };

  const initGoogle = feed => {
    console.log("GOOGLE");
  };

  const getFeed = function(id) {
    switch (id) {
      case 0:
        return initVg;
      case 1:
        return initNrk;
      case 2:
        return initReddit;
      case 3:
        return initGoogle;
      default:
        return null;
    }
  };

  const removeActiveClass = () => {
    const DOM = View.getDOMstrings();

    Module.getFeeds().forEach(feed => {
      $(DOM.navItem[feed.file]).removeClass("active");
    });
  };

  const initHomePage = function() {
    const DOM = View.getDOMstrings();

    const innerHtml = Module.getFeeds().map(feed => {
      return View.getHomeCard(feed, event => {
        event.preventDefault();

        View.setPage(feed.file, () => {
          removeActiveClass();
          $(DOM.navItem[feed.file]).addClass("active");

          const initFeed = getFeed(feed.id);
          initFeed(feed);
        });
      });
    });

    View.appeandHTMLToContainer(innerHtml, View.getDOMstrings().homeRoot);
  };

  const setupNavigation = function() {
    const DOM = View.getDOMstrings();

    Module.getFeeds().forEach(feed => {
      const btn = $(DOM.navItem[feed.file]);

      btn.on("click", event => {
        event.preventDefault();

        View.setPage(feed.file, () => {
          removeActiveClass();
          btn.addClass("active");

          const initFeed = getFeed(feed.id);
          initFeed();
        });
      });
    });
  };

  return {
    init() {
      setupNavigation();

      View.setPage("home", () => {
        initHomePage();
      });
    }
  };
})(jQuery);
