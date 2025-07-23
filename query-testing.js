const db = require('./db/connection')

db.query(`SELECT * FROM articles WHERE author = 'grumpy19';`)
    .then(({rows}) => {
        console.log('All articles by Grumpy', rows)
    })
    .catch(err => console.log(err))
    .finally(() => {
        db.end();
    })