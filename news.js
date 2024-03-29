const axios = require("axios");
const JSSoup = require("jssoup").default;

let newsObj = {};

const filterNews = (news) => {
  const reg = /Who|What|How|Here|This|These|Watch|quiz|\?$|\.{3,6}/;
  if (!reg.test(news)) return true;
  else false;
};

const formatNews = (news) => {
  news = news.replace(/"|'/g, ""); //remove quotation marks
  news = news.replace(/&#39;|&#34;|&quot;|&apos;/g, ""); //remove quotation marks (in html format)
  news = news.replace(/\t|\n/g, ""); //remove \t and \n
  news = news.replace(/\s{2,6}/g, "'"); //remove multiple spaces
  return news;
};

const engadget = async () => {
  console.log("Fetching news from engadget");

  let news = [];
  try {
    const response = await axios.get("https://www.engadget.com/");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headingBlock = soup.find("div", { id: "module-latest" });
    let headings = headingBlock.findAll("h2");
    for (let heading of headings) {
      heading = heading.text;
      heading = formatNews(heading);
      if (filterNews(heading)) news.push(heading);
    }
  } catch (err) {
    console.log(err);
    if (news.length == 0) news.push("None");
  }
  newsObj["engadget"] = news;
};

const gadgets_ndtv = async () => {
  console.log("Fetching news from gadgets_ndtv");

  let news = [];
  try {
    const response = await axios.get("https://gadgets.ndtv.com/news");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("span", "news_listing");

    for (let heading of headings) {
      heading = heading.text;
      heading = formatNews(heading);
      if (filterNews(heading)) news.push(heading);
    }
  } catch (err) {
    console.log(err);
    if (news.length == 0) news.push("None");
  }
  newsObj["gadgets-ndtv"] = news;
};

const gadgets_now = async () => {
  console.log("Fetching news from gadgets_now");

  let news = [];
  try {
    const response = await axios.get("https://www.gadgetsnow.com/tech-news");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("figcaption"); //getting global div which is holding all news heading

    for (let heading of headings) {
      heading = heading.text;
      heading = formatNews(heading);
      if (filterNews(heading)) news.push(heading);
    }
  } catch (err) {
    console.log(err);
    if (news.length == 0) news.push("None");
  }
  newsObj["gadgets-now"] = news;
};

const inshorts = async () => {
  console.log("Fetching news from inshorts");

  let news = [];
  try {
    const response = await axios.get("https://inshorts.com/en/read/technology");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("span", { itemProp: "headline" });

    for (let heading of headings) {
      heading = heading.text; //get text of the span element
      heading = formatNews(heading);
      if (filterNews(heading)) news.push(heading);
    }
  } catch (err) {
    console.log(err);
    if (news.length == 0) news.push("None");
  }
  newsObj["inshorts"] = news;
};

const techcrunch = async () => {
  console.log("Fetching news from techcrunch");

  let news = [];
  try {
    const response = await axios.get("https://techcrunch.com/");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("h2", "post-block__title");

    for (let heading of headings) {
      heading = heading.text;
      heading = formatNews(heading);
      if (filterNews(heading)) news.push(heading);
    }
  } catch (err) {
    console.log(err);
    if (news.length == 0) news.push("None");
  }
  newsObj["techcrunch"] = news;
};

const xda_developers = async () => {
  console.log("Fetching news from xda_developers");

  let news = [];
  try {
    const response = await axios.get(
      "https://www.xda-developers.com/category/xda-news/"
    );
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("div", "item_content");

    for (let heading of headings) {
      heading = heading.find("h4").text;
      heading = formatNews(heading);
      if (filterNews(heading)) news.push(heading);
    }
  } catch (err) {
    console.log(err);
    if (news.length == 0) news.push("None");
  }
  newsObj["xda-developers"] = news;
};

const mobile_reuters = async () => {
  console.log("Fetching news from mobile_reuters");

  let news = [];
  try {
    const response = await axios.get("https://mobile.reuters.com/technology");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("a", "media-story-card__heading__eqhp9");

    for (let heading of headings) {
      heading = heading.text;
      heading = formatNews(heading);
      if (filterNews(heading)) news.push(heading);
    }
  } catch (err) {
    console.log(err);
    if (news.length == 0) news.push("None");
  }
  newsObj["mobile-reuters"] = news;
};

const india = async () => {
  console.log("Fetching news from india");

  let news = [];
  try {
    const response = await axios.get("https://www.india.com/technology/");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("h3");

    for (let heading of headings) {
      heading = heading.text;
      heading = formatNews(heading);
      if (filterNews(heading)) news.push(heading);
    }
  } catch (err) {
    console.log(err);
    if (news.length == 0) news.push("None");
  }
  newsObj["india"] = news;
};

const beebom = async () => {
  console.log("Fetching news from beebom");

  let news = [];
  try {
    const response = await axios.get("https://beebom.com/category/news/");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("h3", "entry-title");

    for (let heading of headings) {
      heading = heading.text;
      heading = formatNews(heading);
      if (filterNews(heading)) news.push(heading);
    }
  } catch (err) {
    console.log(err);
    if (news.length == 0) news.push("None");
  }
  newsObj["beebom"] = news;
};

const about = async () => {
  newsObj["about"] = {
    info: "this is a unofficial news-api from different popular tech news websites. Feel free to give it a star or add new website",
    "my-github": "https://github.com/Shubhamrawat5",
    "news-api-github": "https://github.com/Shubhamrawat5/news-api",
  };
};

module.exports.getNews = async () => {
  console.log("GETTING NEWS!!!");
  const gNdtv = gadgets_ndtv();
  const gNow = gadgets_now();
  const inshts = inshorts();
  const reuters = mobile_reuters();
  const info = about();
  // const crunch = techcrunch();
  // const xda = xda_developers();
  // const ind = india();
  const bee = beebom();
  const engad = engadget();

  await Promise.all([gNdtv, gNow, inshts, reuters, info, bee, engad]);
  return newsObj;
};
