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