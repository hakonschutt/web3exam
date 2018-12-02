/**
 * Module controller is responsiable for holding all data relevant to the application
 * @return { Object } - Module
 */
const Module = (function() {
  /**
   * Public functions
   */
  return {
    /**
     * Returns all feed data
     * @return { Array } - Feeds
     */
    getFeeds() {
      return [
        {
          id: 0,
          title: "VG RSS Feed",
          description:
            "VG RSS - At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
          file: "vg",
          img: "http://1.vgc.no/gfx/vg-rss.png",
          link:
            "https://tek.westerdals.no/~gonrol/ajaxProxy/getRSS.php?url=https://www.vg.no/rss/feed/"
        },
        {
          id: 1,
          title: "Nrk RSS Feed",
          description:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
          file: "nrk",
          img:
            "https://gfx.nrk.no/ZQa7ZMdrmZjV5uzIGBzl-wpLfS5fQrnZ2A7K39YPcXrA",
          link:
            "https://tek.westerdals.no/~gonrol/ajaxProxy/getRSS.php?url=http://www.nrk.no/viten/toppsaker.rss"
        },
        {
          id: 2,
          title: "Reddit RSS Feed",
          description:
            "A place for major news from around the world, excluding US-internal news. - At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
          file: "reddit",
          img: "https://www.redditstatic.com/icon.png",
          link:
            "https://tek.westerdals.no/~gonrol/ajaxProxy/getRSS.php?url=https://www.reddit.com/r/worldnews/.rss"
        },
        {
          id: 3,
          title: "Google world news RSS Feed",
          description:
            "Google News - At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
          file: "google",
          img: "https://ssl.gstatic.com/news-static/gnrss.png",
          link:
            "https://tek.westerdals.no/~gonrol/ajaxProxy/getRSS.php?url=https://news.google.com/news/rss/headlines/section/topic/WORLD?ned=us&hl=en"
        }
      ];
    }
  };
})();
