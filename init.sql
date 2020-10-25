CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    picture VARCHAR(255),
    pool_id INTEGER
);

CREATE TABLE pools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    featured_post_id INTEGER,
    theme_id INTEGER
);

CREATE TABLE themes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    featured_pool_id INTEGER
);

INSERT INTO themes (name, featured_pool_id)
VALUES ('Dogs', '0');

INSERT INTO pools (name, featured_post_id, theme_id)
VALUES ('Pictures of my Husky', '0', '0');

INSERT INTO posts(name, picture, pool_id)
VALUES ('Picture1','link to picture here', '0');