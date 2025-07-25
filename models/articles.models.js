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

function fetchArticleById(article_id) {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
        
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Path not found'})
        }
    const article = rows[0]

    return article
    })
};

module.exports = {fetchArticles, fetchArticleById};