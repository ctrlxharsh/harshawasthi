CREATE TABLE IF NOT EXISTS portfolio_content (
  id text PRIMARY KEY,
  content jsonb NOT NULL,
  revision integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
