const http = require("http");
const news = require("./news.js");
const htmlEntities = require("html-entities");

let newsJSON = "";

const refresh = async () => {
  const response = await news.getNews();
  newsJSON = JSON.stringify(response);
  // newsJSON = newsJSON.replace(/[\u{0080}-\u{FFFF}]/gu,"");
  console.log("NEWS REFRESHED !!!");
};

setInterval(refresh, 1000 * 60 * 60 * 3); //3 hours (8 times a day)

const port = 80;

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Content-Type": "application/json",
    /** add other headers as per requirement */
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (["GET", "POST"].indexOf(req.method) > -1) {
    res.writeHead(200, headers);
    if (newsJSON === "") {
      //empty, for first time
      refresh().then((r) => {
        res.end(`${newsJSON}`);
      });
    } else {
      res.end(`${newsJSON}`);
    }
    return;
  }
  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);
});

server.listen(process.env.PORT || port, () => {
  console.log("server started!");
});
