const axios = require('axios');
const JSSoup = require('jssoup').default;

let newsObj = {};

const filterNews = (news) => {
  let reg = /Who|What|How|Here|This|These/;
  if(!reg.test(news)) return true;
  else false;
}

const gadgets_ndtv = async ()=>{
  response = await axios.get('https://gadgets.ndtv.com/news');
  let htmlContent = response.data; //data field has html code
  //scraping..
  let soup = new JSSoup(htmlContent);
  let headings = soup.findAll("span","news_listing");

  let news=[];
  for(let heading of headings){
    heading = heading.text;
    if(filterNews(heading))
      news.push(heading);
  }
  newsObj["gadgets-ndtv"]=news;
}

const gadgets_now = async ()=>{
  response = await axios.get('https://www.gadgetsnow.com/tech-news');
  let htmlContent = response.data; //data field has html code
  //scraping..
  let soup = new JSSoup(htmlContent);
  let headingBlock =  soup.find("div","tech_list"); //getting global div which is holding all news heading

  let headings = headingBlock.findAll("span","w_tle");

  let news=[];
  for(let heading of headings){
    heading = heading.text;
    if(filterNews(heading))
      news.push(heading);
  }
  newsObj["gadgets-now"]=news;
}

const inshorts = async ()=>{
  response = await axios.get('https://inshorts.com/en/read/technology');
  let htmlContent = response.data; //data field has html code
  //scraping..
  let soup = new JSSoup(htmlContent);
  let headings =  soup.findAll("div","news-card-title");

  let news=[];
  for(let heading of headings){
    heading = heading.find("span").text; //get text of the span element
    if(filterNews(heading))
      news.push(heading);
  }
  newsObj["inshorts"]=news;
}

const techcrunch = async ()=>{
  response = await axios.get('https://techcrunch.com/');
  let htmlContent = response.data; //data field has html code
  //scraping..
  let soup = new JSSoup(htmlContent);
  let headings =  soup.findAll("h2","post-block__title");

  let news=[];
  for(let heading of headings){
    heading = heading.text;
    heading = heading.replace(/\t|\n/g,""); //remove \t and \n
    if(filterNews(heading))
      news.push(heading);
  }
  newsObj["techcrunch"]=news;
}

const xda_developers = async ()=>{
  response = await axios.get('https://www.xda-developers.com/category/xda-news/');
  let htmlContent = response.data; //data field has html code
  //scraping..
  let soup = new JSSoup(htmlContent);
  let headings =  soup.findAll("div","item_content");

  let news=[];
  for(let heading of headings){
    heading = heading.find("h4").text;
    if(filterNews(heading))
      news.push(heading);
  }
  newsObj["xda-developers"]=news;
}

const mobile_reuters = async ()=>{
  response = await axios.get('https://mobile.reuters.com/technology');
  let htmlContent = response.data; //data field has html code
  //scraping..
  let soup = new JSSoup(htmlContent);
  let headings =  soup.findAll("h3","article-heading");

  let news=[];
  for(let heading of headings){
    heading = heading.text;
    if(filterNews(heading))
      news.push(heading);
  }
  newsObj["mobile-reuters"] = news;
}

const business_insider = async ()=>{
  response = await axios.get('https://www.businessinsider.in/tech/news');
  let htmlContent = response.data; //data field has html code
  //scraping..
  let soup = new JSSoup(htmlContent);
  let headings =  soup.findAll("span","liststories_heading");

  let news=[];
  for(let heading of headings){
    heading = heading.text;
    if(filterNews(heading))
      news.push(heading);
  }
  newsObj["business-insider"] = news;
}

const india = async ()=>{
  response = await axios.get('https://www.india.com/technology/');
  let htmlContent = response.data; //data field has html code
  //scraping..
  let soup = new JSSoup(htmlContent);
  let headings =  soup.findAll("h3");

  let news=[];
  for(let heading of headings){
    heading = heading.text;
    heading = heading.replace(/\s{2,6}/g,"'"); //remove multiple spaces
    if(filterNews(heading))
      news.push(heading);
  }
  newsObj["india"] = news;
}

const beebom = async ()=>{
  response = await axios.get('https://beebom.com/category/news/');
  let htmlContent = response.data; //data field has html code
  //scraping..
  let soup = new JSSoup(htmlContent);
  let headings =  soup.findAll("h3","entry-title");

  let news=[];
  for(let heading of headings){
    heading = heading.text;
    if(filterNews(heading))
      news.push(heading);
  }
  newsObj["beebom"] = news;
}

const india_today = async ()=>{
  response = await axios.get('https://www.indiatoday.in/technology');
  let htmlContent = response.data; //data field has html code
  //scraping..
  let soup = new JSSoup(htmlContent);
  let headingBlock = soup.find("div","special-top-news");
  let headings =  headingBlock.findAll("li");

  let news=[];
  for(let heading of headings){
    heading = heading.text;
    if(filterNews(heading))
      news.push(heading);
  }
  newsObj["india-today"] = news;
}

module.exports.getNews = async () => {
  console.log("GETTING NEWS!!!");
  const gNdtv = gadgets_ndtv();
  const gNow = gadgets_now();
  const inshts = inshorts();
  const crunch = techcrunch();
  const xda = xda_developers();
  const reuters = mobile_reuters();
  const insider = business_insider();
  const ind = india();
  const bee = beebom();
  const today = india_today();

  await Promise.all([gNdtv,gNow,inshts,crunch,xda,reuters,insider,ind,bee,today]);
  return newsObj;
}
