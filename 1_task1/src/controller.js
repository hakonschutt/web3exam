/**
 * Controller is responsiable for controlling all application state and actions
 * @return { Object } - Controller
 */
const Controller = (function($) {
  /**
   * Creates xml ajax request
   * @params { String } - link - Url to request data from
   * @return { Promise }
   */
  const makeXMLRequest = link => {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: "GET",
        dataType: "XML",
        url: link
      })
        .done(xmlResponse => {
          resolve(xmlResponse);
        })
        .fail(err => {
          reject(err);
        });
    });
  };
  /**
   * Initializes feed for the given response
   * @params { Object } - feed - feed information
   * @params { Function } - xmlToView - function for changing the xml to html
   */
  const initFeed = (feed, xmlToView) => {
    makeXMLRequest(feed.link)
      .then(response => {
        xmlToView(response);
      })
      .catch(err => {
        View.setFeedAlert(
          "Could not fetch RSS news feed, please try again later"
        );
      });
  };
  /**
   * Initializes function for VG feed
   * @params { Object } - response - response data from request
   */
  const xmlToViewForVgFeed = response => {
    $(response)
      .find("item")
      .each(function() {
        const data = {
          title: $("title", this).text(),
          description: $("description", this).text(),
          img: $("image", this).text(),
          author: null,
          published: $("pubDate", this).text(),
          link: $("link", this).text()
        };

        View.addFeedCard(data);
      });
  };
  /**
   * Initializes function for Nrk feed
   * @params { Object } - response - response data from request
   */
  const xmlToViewForNrkFeed = response => {
    $(response)
      .find("item")
      .each(function() {
        const data = {
          title: $("title", this).text(),
          description: $("description", this).text(),
          img: $(this)
            .find("enclosure")
            .attr("url"),
          author: null,
          published: $("pubDate", this).text(),
          link: $("link", this).text()
        };

        View.addFeedCard(data);
      });
  };
  /**
   * Initializes function for Reddit feed
   * @params { Object } - response - response data from request
   */
  const xmlToViewForRedditFeed = response => {
    $(response)
      .find("entry")
      .each(function() {
        const data = {
          title: $("title", this).text(),
          description: null,
          img: null,
          author: $("name", $("author", this)).text(),
          published: $("updated", this).text(),
          link: $(this)
            .find("link")
            .attr("href")
        };

        View.addFeedCard(data);
      });
  };
  /**
   * Initializes function for Google feed
   * @params { Object } - response - response data from request
   */
  const xmlToViewForGoogleFeed = response => {
    $(response)
      .find("item")
      .each(function() {
        const data = {
          title: $("title", this).text(),
          description: $("description", this)
            .text()
            .replace(/<[^>]+>/g, ""),
          img: null,
          author: null,
          published: $("pubDate", this).text(),
          link: $("link", this).text()
        };

        View.addFeedCard(data);
      });
  };
  /**
   * Function for determening which function to call for xml respons
   * @params { Int } - id - id of feed
   * @return { Function } - xmlToView function
   */
  const getXmlToViewFunction = id => {
    switch (id) {
      case 0:
        return xmlToViewForVgFeed;
      case 1:
        return xmlToViewForNrkFeed;
      case 2:
        return xmlToViewForRedditFeed;
      case 3:
        return xmlToViewForGoogleFeed;
      default:
        return null;
    }
  };
  /**
   * Removes active class from header components
   */
  const removeActiveClass = () => {
    const DOM = View.getDOMstrings();

    Module.getFeeds().forEach(feed => {
      $(DOM.navItem[feed.file]).removeClass("active");
    });
  };
  /**
   * Initializes home page
   */
  const initHomePage = function() {
    const DOM = View.getDOMstrings();
    removeActiveClass();

    Module.getFeeds().forEach(feed => {
      View.addHomeCard(feed, event => {
        event.preventDefault();

        View.setPage("feed", () => {
          removeActiveClass();
          $(DOM.navItem[feed.file]).addClass("active");

          View.setFeedHeader(feed);
          initFeed(feed, getXmlToViewFunction(feed.id));
        });
      });
    });
  };
  /**
   * Initializes navigation
   */
  const setupNavigation = function() {
    const DOM = View.getDOMstrings();

    Module.getFeeds().forEach(feed => {
      const btn = $(DOM.navItem[feed.file]);

      btn.on("click", event => {
        event.preventDefault();

        View.setPage("feed", () => {
          removeActiveClass();
          btn.addClass("active");

          View.setFeedHeader(feed);
          initFeed(feed, getXmlToViewFunction(feed.id));
        });
      });
    });

    $(DOM.homeBtn).on("click", event => {
      event.preventDefault();
      View.setPage("home", initHomePage);
    });
  };
  /**
   * Public functions
   */
  return {
    /**
     * Initiates application
     */
    init() {
      setupNavigation();
      View.setPage("home", initHomePage);
    }
  };
})(jQuery);
