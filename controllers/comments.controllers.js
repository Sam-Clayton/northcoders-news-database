const {fetchCommentsOnArticle} = require('../models/comments.models');

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

module.exports = {getCommentsOnArticle}