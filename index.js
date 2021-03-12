var Crawler = require("crawler");
var url = require("url");
if (process.argv.length < 3) {
  console.log("usage: npm start [url]");
  process.exit(0);
}

var c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      console.log("Title: ", $("title").text());
      const links = $("a");
      for (let i = 0; i < links.length; i++) {
        console.log("link number ", i, ": ", links[i].attribs["href"]);
      }
    }
    done();
  },
});

urls = process.argv;
urls.shift();
urls.shift();

for (let i = 0; i < urls.length; i++) {
  if (url.parse(urls[i]).protocol === null) {
    urls[i] = "http://" + urls[i];
  }
}

c.queue(urls);
