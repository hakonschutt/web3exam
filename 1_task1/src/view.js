const View = (function() {
  const DOMstrings = {
    appRoot: "#app-root",
    homeRoot: "#home-root",
    feedHeader: "#feed-header",
    feed: "#feed",
    navItem: {
      vg: "#vg-nav",
      nrk: "#nrk-nav",
      reddit: "#reddit-nav",
      google: "#google-nav"
    }
  };

  return {
    getDOMstrings() {
      return DOMstrings;
    },
    setPage(file, cb) {
      $(DOMstrings.appRoot).load(`content/${file}.html`, () => cb());
    },
    setFeedHeader(feed) {
      const container = $("<div>");

      const header = $("<h1>", { class: "jumbotron-heading" });
      header.text(feed.title);

      const para = $("<p>", { class: "lead text-muted" });
      para.text(feed.description);

      container.append(header);
      container.append(para);

      $(DOMstrings.feedHeader).append(container);
    },
    addFeedCard(data) {
      const article = $("<article>", { class: "col-md-4" });
      const card = $("<div>", { class: "card mb-4 box-shadow" });
      const img = $("<img>", {
        class: "card-img-top",
        style: "height: 225px; width: 100%; display: block;",
        src: data.img
      });

      card.append(img);

      const cardBody = $("<div>", { class: "card-body" });
      const header = $("<h3>");
      header.text(data.title);

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
      const para = $("<p>", { class: "card-text" });
      para.text(data.description);

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
