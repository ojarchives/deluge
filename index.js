const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory key-value store
const dataStore = {};

app.use(bodyParser.json());

// Endpoint to get all data
app.get('/data', (req, res) => {
  res.json(dataStore);
});

// Endpoint to get a specific data entry
app.get('/data/:key', (req, res) => {
  const key = req.params.key;
  const entry = dataStore[key];
  res.json(entry);
});

// Endpoint to add or update data
app.post('/data/:key', (req, res) => {
  const key = req.params.key;
  const newData = req.body;

  if (!newData) {
    return res.status(400).json({ error: 'Data is required.' });
  }

  dataStore[key] = newData;
  res.json({ [key]: newData });
  console.log(dataStore)
});

// Endpoint to remove data
app.delete('/data/:key', (req, res) => {
  const key = req.params.key;
  if (dataStore.hasOwnProperty(key)) {
    delete dataStore[key];
    res.json({ message: `Deleted data with key: ${key}` });
  } else {
    res.status(404).json({ error: 'Key not found.' });
  }
  console.log(dataStore)
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
