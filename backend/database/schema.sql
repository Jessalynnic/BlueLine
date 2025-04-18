
CREATE TABLE IF NOT EXISTS divisions (
    division_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INSERT INTO divisions (name, description) VALUES
--     ('Cyber Crimes', 'Investigates digital offenses such as hacking, identity theft, and online fraud'),
--     ('Forensics', 'Handles crime scene processing and evidence analysis');

CREATE TABLE IF NOT EXISTS job_titles (
    job_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS sex_codes (
  code  VARCHAR(20) PRIMARY KEY,
  label VARCHAR(50) NOT NULL
);

-- INSERT INTO sex_codes VALUES
--   ('M', 'Male'),
--   ('F', 'Female'),
--   ('I', 'Intersex');

CREATE TABLE IF NOT EXISTS criminals (
    criminal_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    sex VARCHAR(20) REFERENCES sex_codes(code),
    pronouns VARCHAR(10),
    pob_city VARCHAR(100),
    pob_state_province VARCHAR(100),
    country_of_citizenship VARCHAR(4),
    date_processed TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO criminals (first_name, last_name, date_of_birth, sex, pronouns, pob_city, pob_state_province, country_of_citizenship) VALUES
    ('Liam', 'O''Connor', '1994-09-09', 'M', 'he/him', 'Staten Island', 'New York', 'USA'),
    ('Ava', 'Nguyen', '1988-12-03', 'F', 'she/her', 'Houston', 'Texas', 'USA'),
    ('Noah', 'Brown', '1983-05-11', 'M', 'they/them', 'Hauppauge', 'New York', 'USA'),
    ('Isabella', 'Davis', '1998-03-03', 'F', 'she/her', 'Brooklyn', 'New York', 'USA'),
    ('Elijah', 'Thomas', '1985-10-20', 'M', 'he/him', 'Vancouver', 'British Columbia', 'CAN'),
    ('Mia', 'Wilson', '1990-06-17', 'F', 'they/them', 'Manhattan', 'New York', 'USA'),
    ('William', 'Scott', '1992-01-25', 'M', 'he/him', 'Commack', 'New York', 'USA');