const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

// GET: Retrieve all items
app.get('/api/items', (req, res) => {
  res.json(items); // Respond with the array of items
});

// GET: Retrieve a specific item by ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  
  if (item) {
    res.json(item); // Respond with the found item
  } else {
    res.status(404).json({ message: `Item with id ${id} not found.` }); // Respond with 404 Not Found if item doesn't exist
  }
});

// POST: Create a new item
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem); // Respond with the created item
});

// DELETE: Delete an item by ID
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);

  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1); // Remove the item from the array
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: `Item with id ${id} not found.` }); // Respond with 404 Not Found if item doesn't exist
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to My REST API!');
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));