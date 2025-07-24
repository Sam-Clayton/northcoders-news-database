const express = require('express')
const app = express();
const getTopics = require('./controllers/topics.controllers');
const getArticles = require('./controllers/articles.controllers');

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles)

module.exports = app