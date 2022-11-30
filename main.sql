CREATE TABLE exercise(
    id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(40) NOT NULL,
    image_exercise VARCHAR(40) NOT NULL,
    cues VARCHAR(255) NOT NULL
);

CREATE TABLE patient(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    username VARCHAR(40) NOT NULL,
    age VARCHAR(40) NOT NULL,
    login_code VARCHAR(40) NOT NULL
);

CREATE TABLE progress(
    id SERIAL PRIMARY KEY,
    login_id INT NOT NULL,
    exercise_id INT NOT NULL,
    points decimal(10,2) NOT NULL,
    percentages numeric(3,2) NOT NULL,
    progress numeric(3,2) NOT NULL
);

CREATE TABLE doctor(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL
);

-- table name = physio_app