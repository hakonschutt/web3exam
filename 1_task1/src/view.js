/**
 * View controller is responsiable to controlling the document/user view
 * @return { Object } - View
 */
const View = (function() {
  /**
   * Private variable
   */
  const DOMstrings = {
    appRoot: "#app-root",
    homeRoot: "#home-root",
    homeBtn: "#home-btn",
    feedAlert: "#feed-alert",
    feedHeader: "#feed-header",
    feed: "#feed",
    navItem: {
      vg: "#vg-nav",
      nrk: "#nrk-nav",
      reddit: "#reddit-nav",
      google: "#google-nav"
    }
  };

  /**
   * Public functions
   */
  return {
    /**
     * Return DOM strings used to append actions and html
     * @return {Objct} DOM strings
     */
    getDOMstrings() {
      return DOMstrings;
    },

    /**
     * Sets app root content page
     * @param {String} - file - file to get from content folder
     * @param {Func} - cb - callback function
     */
    setPage(file, cb) {
      $(DOMstrings.appRoot).load(`content/${file}.html`, () => cb());
    },

    /**
     * Set Feed alert
     * @param {String} - warning - Warning to print to feed
     */
    setFeedAlert(warning) {
      const alert = $("<div>", { class: "alert alert-danger" });
      const header = $("<h4>", { class: "alert-heading" }).text("Ooops!");
      const info = $("<p>").text(warning);

      alert.append(header);
      alert.append(info);

      $(DOMstrings.feedAlert).html(alert);
    },

    /**
     * Set Feed jumbotron
     * @param {Object} - feed - Feed info
     */
    setFeedHeader(feed) {
      const container = $("<div>");

      const header = $("<h1>", { class: "jumbotron-heading" }).text(feed.title);
      const para = $("<p>", { class: "lead text-muted" }).text(
        feed.description
      );

      container.append(header);
      container.append(para);

      $(DOMstrings.feedHeader).append(container);
    },

    /**
     * Add Feed card for indevidual news
     * @param {Object} - data - News info
     */
    addFeedCard(data) {
      const article = $("<article>", { class: "col-md-4" });
      const card = $("<div>", { class: "card mb-4 box-shadow" });

      if (data.img) {
        const img = $("<img>", {
          class: "card-img-top",
          style: "height: 225px; width: 100%; display: block;",
          src: data.img
        });

        card.append(img);
      }

      const cardBody = $("<div>", { class: "card-body" });
      const header = $("<h3>").text(data.title);

      const para = $("<p>", { class: "card-text" }).text(data.description);

      const author = $("<small>", { class: "card-text d-block text-muted" });
      const authorStrong = $("<strong>").text("Author: ");
      const authorName = $("<span>").text(data.author || "Unknown");
      author.append([authorStrong, authorName]);

      const published = $("<small>", { class: "card-text d-block text-muted" });
      const publishedStrong = $("<strong>").text("Published: ");
      const publishedDate = $("<span>").text(data.published);
      published.append([publishedStrong, publishedDate]);

      const btnGroup = $("<div>", { class: "btn-group d-block mt-3" });
      const btn = $("<a>", {
        class: "btn btn-sm btn-primary text-white",
        href: data.link
      }).text("Read more");

      btnGroup.append(btn);

      cardBody.append(header);
      cardBody.append(para);
      cardBody.append(author);
      cardBody.append(published);
      cardBody.append(btnGroup);

      card.append(cardBody);
      article.append(card);

      $(DOMstrings.feed).append(article);
    },

    /**
     * Adds home card with info about different RSS feeds.
     * @param {Object} - data - RSS feed info
     * @param {Func} - onClick - onClick function for rss feed
     */
    addHomeCard(data, onClick) {
      const container = $("<div>", { class: "card mb-4" });
      const cardHeader = $("<div>", { class: "card-header" });
      cardHeader.text(data.title);

      const cardBody = $("<div>", { class: "card-body" });
      const media = $("<div>", { class: "media" });

      const img = $("<img>", {
        src: data.img,
        class: "align-self-center mr-5",
        width: "140",
        alt: `Logo of ${data.file}`
      });

      const mediaBody = $("<div>", { class: "media-body" });
      const para = $("<p>", { class: "card-text" }).text(data.description);

      const link = $("<a>", {
        class: "btn btn-primary float-right",
        href: "#0"
      });

      link.text("Go to feed");
      link.on("click", onClick);

      mediaBody.append(para);
      mediaBody.append(link);

      media.append(img);
      media.append(mediaBody);

      cardBody.append(media);

      container.append(cardHeader);
      container.append(cardBody);

      $(DOMstrings.homeRoot).append(container);
    }
  };
})();
