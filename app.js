const express = require('express')
const app = express();
const getTopics = require('./controllers/topics.controllers');
const {getArticles, getArticleById} = require('./controllers/articles.controllers');
const getUsers = require('./controllers/users.controllers');


app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)

app.get('/api/articles/:article_id', getArticleById)

app.use((req, res) => {
    res.status(404)
    res.send({ msg: 'Article not found'})
});

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400);
        res.send({ msg: 'Bad Request'});
    } else next(err);
});

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status);
        res.send({msg: err.msg});
    }else next(err);
});

app.use((err, req, res, next) => {
    res.status(500);
    res.send({msg: 'internal server error'})
});

module.exports = app