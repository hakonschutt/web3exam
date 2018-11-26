const View = (function() {
  const DOMstrings = {
    appRoot: "#app-root",
    homeRoot: "#home-root",
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
    getHomeCard(data, onClick) {
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

      return container;
    },
    appeandHTMLToContainer(html, domString) {
      $(domString).append(html);
    }
  };
})();
