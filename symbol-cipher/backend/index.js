const express = require('express');
const cors = require('cors');
const { encode, decode } = require('./cipher');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoints
app.post('/api/encode', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const encoded = encode(text);
    return res.json({ encoded });
  } catch (error) {
    return res.status(400).json({ error: error.message, code: error.code });
  }
});

app.post('/api/decode', (req, res) => {
  try {
    const { encoded } = req.body;
    
    if (!encoded) {
      return res.status(400).json({ error: 'Encoded text is required' });
    }
    
    const text = decode(encoded);
    return res.json({ text });
  } catch (error) {
    return res.status(400).json({ error: error.message, code: error.code });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing 