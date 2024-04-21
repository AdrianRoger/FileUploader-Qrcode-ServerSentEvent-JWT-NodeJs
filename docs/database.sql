/*CREATE DATABASE productutils*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_type AS ENUM ('admin', 'client');

CREATE table USERS(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(10) UNIQUE NOT NULL,
    password VARCHAR(32) NOT NULL,
    type user_type NOT NULL
);

INSERT INTO USERS(username, password, type) 
VALUES
    ('adrianr', '123456', 'admin'),
    ('devide', '654321', 'client');

CREATE TABLE product(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description VARCHAR(200) NOT NULL,
    img_name VARCHAR(255) NOT NULL
);

/*No one insert created to table product*/

