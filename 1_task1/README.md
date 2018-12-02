# Task 1 - News Mashup - RSS Feed (RSS/XML) (50%)

### Project info

The project is using a MVC design pattern for better code structure.

### Project structure

```
content/          -> HTML content pages
src/              -> Main src folder
  assets/         -> Style and images
  imports/        -> Project imports
```

### Project Spec

In this task you will work with ajax to retrieve news sites' RSS (i.e. XML). You will create a web page where the user can through a menu (navigation bar and/or menu buttons) select news from different sources

To be able to retrieve the RSS correctly you will use a PHP proxy code. Have this url before the url of the RSS, in the ajax url call:

- https://tek.westerdals.no/~gonrol/ajaxProxy/getRSS.php?url=
  As an example:

```js
url: "https://tek.westerdals.no/~gonrol/ajaxProxy/getRSS.php?url=https://www.vg.no/rss/feed/?categories=1097";
```

Feeds that you may use. It is encouraged to also find other RSS feeds

- https://www.vg.no/rss/feed/?categories=1097
- http://feeds.bbci.co.uk/news/world/rss.xml
- http://www.nrk.no/viten/toppsaker.rss

As inspiration this web page is about the most popular RSS news sites:

- https://blog.feedspot.com/world_news_rss_feeds/

Display as much as possible, for example:

- titles
- author
- date updated
- links
- images

Notice: RSS feeds are nearly identical; however some may have some variations on names of tags. You will have to first read and get to know the feeds.
