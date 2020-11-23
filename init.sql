CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "picture" VARCHAR(255),
  "pool_id" INTEGER
);

CREATE TABLE "pools" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "featured_post_id" INTEGER,
  "theme_id" INTEGER,
  "user_id" INTEGER
);

CREATE TABLE "themes" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "featured_pool_id" INTEGER
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE,
  "password" VARCHAR(255),
  "role" VARCHAR(255)
);

ALTER TABLE "posts" ADD FOREIGN KEY ("pool_id") REFERENCES "pools" ("id");

ALTER TABLE "pools" ADD FOREIGN KEY ("theme_id") REFERENCES "themes" ("id");

ALTER TABLE "pools" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "themes" ADD FOREIGN KEY ("featured_pool_id") REFERENCES "pools" ("id");

ALTER TABLE "pools" ADD FOREIGN KEY ("featured_post_id") REFERENCES "posts" ("id");

INSERT INTO users(username, password, role)
VALUES ('admin','admin','admin');

INSERT INTO users(username, password, role)
VALUES ('user','user','user');