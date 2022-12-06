const axios = require("axios");
const JSSoup = require("jssoup").default;

const filterNews = (news) => {
  const reg = /Who|What|How|Here|This|These|Watch|quiz|\?$|\.{3,6}/;
  if (!reg.test(news)) return true;
  else false;
};

const gadgets_now = async () => {
  let news = [];
  try {
    const response = await axios.get("https://techcrunch.com/");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("h2", "post-block__title");

    for (let heading of headings) {
      heading = heading.text;
      heading = heading.replace(/\t|\n/g, ""); //remove \t and \n
      if (filterNews(heading)) news.push(heading);
    }
  } catch (err) {
    console.log(err);
    if (news.length == 0) news.push("None");
  }
  console.log(news);
};

gadgets_now();
