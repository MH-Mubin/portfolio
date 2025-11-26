-- Create contact_submissions table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new'
);

-- Table for cached GitHub data (optional)
CREATE TABLE IF NOT EXISTS github_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_login VARCHAR(255) UNIQUE,
  repos_count INTEGER,
  languages JSON,
  total_stars INTEGER,
  contributions INTEGER,
  last_updated TIMESTAMP
);
