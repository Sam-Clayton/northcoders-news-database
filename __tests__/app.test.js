const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const app = require("../app.js");
const request = require("supertest");

beforeEach(()=>{
    return seed(data)
});

afterAll(()=>{
    return db.end()
});

describe.skip("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug:         expect.any(String),
            description:  expect.any(String),
            img_url:      expect.any(String)
          })
        })
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(13);
        articles.forEach((article) => {
          expect(article).toMatchObject({
            author:           expect.any(String),
            title:            expect.any(String),
            article_id:       expect.any(Number),
            topic:            expect.any(String),
            created_at:       expect.any(String),
            votes:            expect.any(Number),
            article_img_url:  expect.any(String),
            comment_count:    expect.any(String),
          })
        })

      });
  });
});

describe("GET /api/users", () => {
  test("200: Responds with users objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toMatchObject({
            username:     expect.any(String),
            name:         expect.any(String),
            avatar_url:   expect.any(String)
          })
        })
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with matching article object", () => {
    return request(app)
      .get("/api/articles/5")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.author).toBe("rogersop"),
        expect(article.title).toBe("UNCOVERED: catspiracy to bring down democracy")
        expect(article.article_id).toBe(5)
        expect(article.body).toBe("Bastet walks amongst us, and the cats are taking arms!")
        expect(article.topic).toBe("cats")
        expect(article.created_at).toEqual("2020-08-03T13:14:00.000Z")
        expect(article.votes).toBe(0)
        expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
      })
  });

  test("400: Responds with 400 error when the requested path is in the wrong format", () => {
    return request(app)
      .get("/api/articles/not-correct-id-input")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request")
      })
  });
  test("404: Responds with 404 error when the requested path doesn\'t exist", () => {
    return request(app)
      .get("/api/articles/12345")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found")
      })
  });
})

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with matching comments of the correct article", () => {
    return request(app)
      .get('/api/articles/3/comments')
      .expect(200)
      .then(({body: {comments}}) => {
        expect(comments).toHaveLength(2);
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          })
        })
      })
  });
  test("400: Responds with 400 error when the requested path is in the wrong format", () => {
    return request(app)
      .get("/api/articles/not-a-number/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request")
      })
  });
   test("404: Responds with 404 error when the requested path doesn\'t exist", () => {
    return request(app)
      .get("/api/articles/11111/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found")
      })
  });
})

