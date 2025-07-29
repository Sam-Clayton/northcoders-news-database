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
    .catch(err => {
        next(err);
    })
};

function updateArticleVotes(req, res, next) {
    const { article_id } = req.params
    const { inc_votes } = req.body
    console.log(article_id, inc_votes, '<<< REQ CHECK')
    return amendArticleVotes(inc_votes, article_id)
    .then((article) => {
        console.log(article, '<<<< ARTICLE CHECK')
        res.status(200)
        .send(article)
    })
    .catch(err => {
        console.log(err, '<<<< CTRL ERR')
        next(err)
    })
}

module.exports = {getArticles, getArticleById, updateArticleVotes};