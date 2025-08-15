const db = require("../db/connection");

function fetchCommentsOnArticle(article_id) {
    return db.query(`
        SELECT comment_id, comments.votes, comments.created_at, comments.author, comments.body, articles.article_id 
        FROM comments 
        LEFT JOIN articles 
        ON articles.article_id = comments.article_id 
        WHERE comments.article_id = $1
        ORDER BY comments.created_at DESC;`,
        [article_id]
    )
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Path not found'})
        }
    const comments = rows

    return comments;
    });
};

function insertCommentOnArticle(article_id, username, body) {
    return db.query(`
        INSERT INTO comments
            (article_id, author, body)
        VALUES
            ($1, $2, $3)
        RETURNING *`, 
        [article_id, username, body]
    )
    .then(({rows}) => {
        const comment = rows[0]
        return comment 
    })
    .catch(err => {
        if (err.code === '23503') {
            if (err.constraint === 'comments_author_fkey') {
                return Promise.reject({status: 400, msg: 'Unrecognised username'})
            }
            if (err.constraint === 'comments_article_id_fkey') {
                return Promise.reject({status: 404, msg: 'Article not found'})
            }
        };
        return Promise.reject(err)
    });
};

module.exports = {fetchCommentsOnArticle, insertCommentOnArticle}