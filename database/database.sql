CREATE DATABASE api_database;

CREATE TABLE mobile(
    mobile_id SERIAL PRIMARY KEY,
    brand VARCHAR(50),
    name VARCHAR(50),
    price int
);