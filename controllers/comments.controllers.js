const {fetchCommentsOnArticle, insertCommentOnArticle} = require('../models/comments.models');

function getCommentsOnArticle(req, res, next) {
    const { article_id } = req.params
    return fetchCommentsOnArticle(article_id)
    .then((comments) => {
        res.status(200)
        .send({comments})
    })
    .catch(err => {
        next(err)
    })
}

function postCommentOnArticle(req, res, next) {
    const { article_id } = req.params
    const { username, body } = req.body
    return insertCommentOnArticle(article_id, username, body)
    .then((comment) => {
        res.status(201)
        .send({postedComment: comment})
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {getCommentsOnArticle, postCommentOnArticle}