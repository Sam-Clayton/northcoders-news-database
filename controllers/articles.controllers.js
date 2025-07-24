const {fetchArticles, fetchArticleById} = require('../models/articles.models');

function getArticles(req, res) {
    fetchArticles().then((articles) => {
        res.status(200)
        .send({articles})
    })
};

function getArticleById(req, res, next) {
    const { article_id } = req.params
    return fetchArticleById(article_id)
    .then((article) => {
        res.status(200)
        res.send({article})
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {getArticles, getArticleById};