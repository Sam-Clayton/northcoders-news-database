const {fetchArticles, fetchArticleById, amendArticleVotes} = require('../models/articles.models');

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
        .send({article});
    })
};

function updateArticleVotes(req, res, next) {
    const { article_id } = req.params
    const { inc_votes } = req.body
    
    return amendArticleVotes(inc_votes, article_id)
    .then((article) => {
        res.status(200)
        .send(article)
    })
}

module.exports = {getArticles, getArticleById, updateArticleVotes};