const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Task Tracker API Running');
});

// GET ALL TASKS
app.get('/api/tasks', async (req, res) => {
  try {
    const { status, priority } = req.query;

    let query = 'SELECT * FROM tasks WHERE 1=1';
    let values = [];

    if (status === 'Done') {
      query += ' AND is_done = true';
    }

    if (status === 'Pending') {
      query += ' AND is_done = false';
    }

    if (priority) {
      values.push(priority);
      query += ` AND priority = $${values.length}`;
    }

    query += ' ORDER BY due_date ASC NULLS LAST';

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// GET SINGLE TASK
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE id=$1',
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// CREATE TASK
app.post('/api/tasks', async (req, res) => {
  try {
    const {
      title,
      description,
      due_date,
      priority
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO tasks
      (title, description, due_date, priority)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        title,
        description,
        due_date,
        priority
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// UPDATE TASK
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const {
      title,
      description,
      due_date,
      priority,
      is_done
    } = req.body;

    const result = await pool.query(
      `
      UPDATE tasks
      SET
      title=$1,
      description=$2,
      due_date=$3,
      priority=$4,
      is_done=$5
      WHERE id=$6
      RETURNING *
      `,
      [
        title,
        description,
        due_date,
        priority,
        is_done,
        req.params.id
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// DELETE TASK
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM tasks WHERE id=$1',
      [req.params.id]
    );

    res.json({
      message: 'Task Deleted'
    });
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});