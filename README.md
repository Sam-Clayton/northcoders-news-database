# NC News Backend

A RESTful API for a Reddit-style news site, built with Node.js, Express, and PostgreSQL.

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/your-username/nc-news-BE.git
cd nc-news-BE
```

### 2. Install Dependencies

```
npm install
```

### 3. Environment Variables

Create two `.env` files in the project root:

- `.env.development`
- `.env.test`

Each file should contain:

```
PGDATABASE=nc_news         # for development
PGDATABASE=nc_news_test    # for test
```

### 4. Setup the Databases

Run the setup script to create your databases:

```
npm run setup-dbs
```

### 5. Seed the Database

Populate your database with test data:

```
npm run seed
```

### 6. Run Tests

```
npm test
```

## API Endpoints

- `GET /api/topics` - List all topics
- `GET /api/articles` - List all articles
- `GET /api/articles/:article_id` - Get a single article
- `PATCH /api/articles/:article_id` - Update an article's votes
- `GET /api/articles/:article_id/comments` - List comments for an article
- `POST /api/articles/:article_id/comments` - Add a comment to an article
- `GET /api/users` - List all users

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Jest & Supertest (for testing)

## Project Purpose

This backend powers a Reddit-style news site, providing endpoints for articles, topics, comments, and users. It is designed for learning and practice with RESTful APIs and databases.

---
