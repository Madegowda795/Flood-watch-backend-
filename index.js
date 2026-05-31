const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = 'dEasGMt9cFUqj7rz6pTgZB5u38fnHkxleb0JhCwDyKiNQ2VSOLMbpPfIvXBh79JH3qjYlSWgZuQkyAL6';

app.get('/send-otp', async (req, res) => {
  const { phone, otp } = req.query;
  try {
    const message = encodeURIComponent('FloodWatch Alert: ' + otp);
    const response = await fetch(
      'https://www.fast2sms.com/dev/bulkV2?authorization=' + API_KEY + '&route=q&message=' + message + '&language=english&flash=0&numbers=' + phone
    );
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.json({ return: false, message: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
