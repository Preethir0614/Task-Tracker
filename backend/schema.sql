CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  due_date DATE NOT NULL,
  priority VARCHAR(10) NOT NULL CHECK (priority IN ('Low','Medium','High')),
  is_done BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO tasks (title, description, due_date, priority, is_done)
VALUES
  ('Complete Assignment', 'Finish Task Tracker', '2026-06-18', 'High', false),
  ('Prepare Interview', 'Review Angular', '2026-06-19', 'Medium', false),
  ('Buy Groceries', 'Milk and Bread', '2026-06-20', 'Low', false)
ON CONFLICT DO NOTHING;
