const db = require("../db/connection");

function fetchArticles() {
    return db.query(`
        SELECT title, articles.article_id, topic, articles.author, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS "comment_count" 
        FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id 
        GROUP BY articles.article_id 
        ORDER BY created_at DESC;
    `)
    .then(({ rows: articles }) => {
        return articles
    })
};

module.exports = fetchArticles;