-- A CRUD app is a specific type of software application that consists of four basic operations: 
-- 

CREATE DATABASE goodfoodhunting;
-- remember to connect to the database before creating tables
-- \c goodfoodhunting

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    user_id INTEGER NOT NULL
);


ALTER TABLE dishes ADD COLUMN user_id INTEGER NOT NULL;


INSERT INTO dishes (title, image_url)
VALUES ('pasta', 'https://c8.alamy.com/comp/2CN5KYE/raw-cannelloni-pasta-in-a-wooden-round-plate-isolated-on-white-background-2CN5KYE.jpg' );
INSERT INTO dishes (title, image_url)
VALUES ('cake', 'https://w7.pngwing.com/pngs/771/868/png-transparent-round-cake-with-white-icing-birthday-cake-chocolate-cake-wedding-cake-sponge-cake-frosting-icing-beautiful-birthday-cake-cream-cake-decorating-sugar-cake-thumbnail.png');
INSERT INTO dishes (title, image_url)
VALUES ('salad', 'https://direct.saladservers.com.au/cdn/shop/products/GreekSalad-PowerBowl_1024x1024@2x.jpg?v=1648440338');


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
    );




