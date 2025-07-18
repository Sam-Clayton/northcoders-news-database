const db = require("../connection")
const tablesQuery = require('./create-tables-query')
const format = require("pg-format")
const util = require('./utils')


const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(tablesQuery.createTables)
  .then(() => {
    const topicsQuery = `INSERT INTO topics(description, slug, img_url)
      VALUES %L RETURNING *`;

    const preparedTopics = topicData.map(
        ({ description, slug, img_url }) =>
          [description, slug, img_url]
      )
    const formattedTopicsQuery = format(topicsQuery, preparedTopics)

    return db.query(formattedTopicsQuery)
  })
  .then(() => {
    const usersQuery = `INSERT INTO users(username, name, avatar_url)
      VALUES %L RETURNING *`

    const preparedUsers = userData.map(
      ({username, name, avatar_url}) =>
        [username, name, avatar_url]
      )
    const formattedUsersQuery = format(usersQuery, preparedUsers)

    return db.query(formattedUsersQuery);
  })
  .then(() => {
    const articlesQuery = `INSERT INTO articles(title, topic, 
    author, body, created_at, votes, article_img_url)
    VALUES %L RETURNING *`;

    const preparedArticles = articleData.map(
      ({title, topic, author, body, created_at, votes, article_img_url}) => {
        return [
          title, 
          topic, 
          author, 
          body, 
          new Date(created_at), 
          votes, 
          article_img_url
        ]
      });
    const formattedArticlesQuery = format(articlesQuery, preparedArticles);

    return db.query(formattedArticlesQuery);
  })
  .then(({ rows: articles }) => {
    const ref = util.createReference(articles, 'title', 'article_id')

    const commentsQuery = `INSERT INTO comments(article_id, body, 
    votes, author, created_at)
    VALUES %L RETURNING *`;

    const preparedComments = commentData.map(({article_id, body, 
    votes, author, created_at}) => {
      return [
        ref[article_id], 
        body, 
        votes, 
        author, 
        new Date(created_at)
      ]
    });
    const formattedCommentsQuery = format(commentsQuery, preparedComments)

    return db.query(formattedCommentsQuery);
  })
  .catch(err => console.log(err, '<<<< ERR'))
};

module.exports = seed;
