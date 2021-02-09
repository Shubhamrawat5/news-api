const http = require("http");
const news = require("./news.js");
const htmlEntities = require("html-entities");

let newsJSON = "";

const refresh = async () => {
  const response = await news.getNews();
  newsJSON = JSON.stringify(response);
  // newsJSON = newsJSON.replace(/[\u{0080}-\u{FFFF}]/gu,"");
  newsJSON = htmlEntities.decode(newsJSON);
  console.log("NEWS REFRESHED !!!");
};

setInterval(refresh, 1000 * 60 * 60 * 3); //3 hours (8 times a day)

const hostname = "localhost";
const port = 80;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  if (newsJSON === "") {
    //empty, for first time
    refresh().then((r) => {
      res.end(`${newsJSON}`);
    });
  } else {
    res.end(`${newsJSON}`);
  }
});

server.listen(port, hostname, () => {
  console.log("server started!");
});
