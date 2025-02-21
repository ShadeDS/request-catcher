// main.js
const express = require('express');
const app = express();

// Use Express JSON middleware to parse JSON bodies
app.use(express.json());

// A global counter to track total elements received
let totalElements = 0;

/**
 * POST /callback
 * Expects JSON in the request body. If it's an array, increment
 * the counter by the array's length. Otherwise, increment by 1.
 */
app.post('/callback', (req, res) => {
  const body = req.body;
  
  if (Array.isArray(body)) {
    // If body is an array, add its length to our counter
    totalElements += body.length;
  } else if (typeof body === 'object' && body !== null) {
    // If it's a single object, increment by 1
    totalElements += 1;
  } else {
    // If it's neither an object nor array, handle as needed
    // For now, do nothing or treat it as a single item:
    // totalElements += 1;
  }

  console.log('Received callback, updated counter:', totalElements);
  return res.status(200).send('OK');
});

/**
 * GET /stats
 * Returns the current value of totalElements in JSON.
 */
app.get('/stats', (req, res) => {
  res.json({ count: totalElements });
});

// Use the port Render or your environment provides, fallback to 3000 locally
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Callback server listening on port ${port}`);
});
