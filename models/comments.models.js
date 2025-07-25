const db = require("../db/connection");

function fetchCommentsOnArticle(article_id) {
    return db.query(`
        SELECT comment_id, comments.votes, comments.created_at, comments.author, comments.body, articles.article_id 
        FROM comments 
        LEFT JOIN articles 
        ON articles.article_id = comments.article_id 
        WHERE comments.article_id = $1
        ORDER BY comments.created_at
        ;`, 
        [article_id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Path not found'})
        }
    const comments = rows

    return comments;
    })
}

module.exports = {fetchCommentsOnArticle}