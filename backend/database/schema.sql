
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

CREATE TABLE IF NOT EXISTS criminals (
    criminal_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    sex VARCHAR(20) REFERENCES sex_codes(code),
    gender VARCHAR(10),
    pronouns VARCHAR(10),
    pob_city VARCHAR(100),
    pob_state_province VARCHAR(100),
    country_of_citizenship VARCHAR(4),
    date_processed TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS eye_colors (
  code VARCHAR(20) PRIMARY KEY,
  description TEXT
);

CREATE TABLE IF NOT EXISTS criminal_profiles (
    profile_id SERIAL PRIMARY KEY,
    criminal_id INT UNIQUE REFERENCES criminals(criminal_id) ON DELETE CASCADE,
    address_street VARCHAR(150),
    address_city VARCHAR(100),
    address_state_province VARCHAR(5),
    address_postal_code VARCHAR(20),
    address_country VARCHAR(100),
    phone_number VARCHAR(20),
    left_eye_color VARCHAR(20) REFERENCES eye_colors(code),
	right_eye_color VARCHAR(20) REFERENCES eye_colors(code),
    hair_color VARCHAR(20),
    height_feet INTEGER,
    height_inches INTEGER,
    weight_lbs INTEGER,
    tattoos TEXT,
    distinguishing_marks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS criminal_ssn (
    ssn_id SERIAL PRIMARY KEY,
    criminal_id INT REFERENCES criminals(criminal_id) ON DELETE CASCADE,
    ssn VARCHAR(11) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS languages (
    language_code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS criminal_languages (
    id SERIAL PRIMARY KEY,
    criminal_id INT REFERENCES criminals(criminal_id) ON DELETE CASCADE,
    language_code VARCHAR(10) REFERENCES languages(language_code) ON DELETE CASCADE,
    fluency_level VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS licenses (
    license_id SERIAL PRIMARY KEY,
    criminal_id INT REFERENCES criminals(criminal_id) ON DELETE CASCADE,
    license_type VARCHAR(50) NOT NULL,
    license_number VARCHAR(25) NOT NULL,
    license_class VARCHAR(10),
    state_issued VARCHAR(50),
    country_issued VARCHAR(4),
    expiration_date DATE,
    status VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

