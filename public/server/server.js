// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db'); // Import the DB connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to fetch users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users'); 
    res.json(result.rows); 
  } catch (err) {
    console.error('error fetching users:', err); 
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Endpoint to create a new user
app.post('/users', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.json(existingUser.rows[0]); 
    }
    
    // Insert new user
    const result = await pool.query(
      'INSERT INTO users (email) VALUES ($1) RETURNING *',
      [email]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Endpoint to save categories
app.post('/categories', async (req, res) => {
  try {
    const { userEmail, categories } = req.body;
    
    // Get user ID
    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [userEmail]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const userId = userResult.rows[0].id;
    
    // Insert categories
    for (const category of categories) {
      await pool.query(
        'INSERT INTO categories (user_id, category_name, amount) VALUES ($1, $2, $3)',
        [userId, category.categoryName, category.amount]
      );
    }
    
    res.status(201).json({ message: 'categories saved ' });
  } catch (err) {
    console.error('Error saving categories:', err);
    res.status(500).json({ error: 'Error saving categories' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});