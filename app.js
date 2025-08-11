const express = require('express')
const app = express();
const getTopics = require('./controllers/topics.controllers');
const {getArticles, getArticleById, updateArticleVotes} = require('./controllers/articles.controllers');
const getUsers = require('./controllers/users.controllers');
const {getCommentsOnArticle, postCommentOnArticle} = require('./controllers/comments.controllers');
const cors = require('cors');

app.use(cors())

app.use(express.json())

app.use(express.static('public'))

app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles)
app.get('/api/users', getUsers)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles/:article_id/comments', getCommentsOnArticle)

app.post('/api/articles/:article_id/comments', postCommentOnArticle)

app.patch('/api/articles/:article_id', updateArticleVotes)

app.use((req, res) => {
    res.status(404)
    res.send({ msg: 'Path not found'})
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