const Promise = require("bluebird");
const cheerio = require("cheerio");
const superagent = require("superagent");
const fs = require("fs");

const url = "https://www.cermati.com/artikel";
const baseUrl = "https://www.cermati.com"

const result = {
    articles: []
}

superagent.get(url).then(async (res) => {
    const $ = cheerio.load(res.text);
    const listArticle = $(".list-of-articles").find(".article-list-item").find("a");
    const listUrl = [];
    listArticle.each( (index, value) => {
        listUrl.push(baseUrl + $(value).attr("href"));
    });

    result.articles = await Promise.map(listUrl, (x) => {
        const objResult = {};
        
        return superagent.get(x).then(res => {
            const $ = cheerio.load(res.text);
            const title = $(".post-title").text().trim();
            const author = $(".author-name").text().trim();
            const postingDate = $(".post-date").find("span").text().trim();
            const relatedArticles = [];

            let elemRelatedArticle = $(".panel-header");

            let filteredElem = elemRelatedArticle.filter(function (i, el) {
                return $(this).text().trim() === "Artikel Terkait";
            });

            filteredElem.parent().find("li").each((index, value) => {
                const titleRelated = $(value).find(".item-title").text().trim();
                const urlRelated = baseUrl + $(value).find("a").attr("href").trim();

                relatedArticles.push({
                    url: urlRelated,
                    title: titleRelated
                })
            })
            
            const objResult = {
                url: x,
                title,
                author,
                postingDate,
                relatedArticles
            };

            return objResult;
        })
    })

    const jsonResult = JSON.stringify(result);
    const filename = "solution.json";
    fs.writeFileSync(filename, jsonResult);
})
