const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const TWILIO_SID = 'AC51b53427c5c26f6af08a17dfaa9ad2ed';
const TWILIO_TOKEN = '3e4cb4a69c756524b8419a72ec04178e';
const TWILIO_FROM = '+12185683292';

app.get('/send-otp', async (req, res) => {
  const { phone, otp } = req.query;
  try {
    const fetch = require('node-fetch');
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
    const body = new URLSearchParams({
      From: TWILIO_FROM,
      To: '+91' + phone,
      Body: 'FloodWatch Alert: ' + otp
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(TWILIO_SID + ':' + TWILIO_TOKEN).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    });
    const data = await response.json();
    res.json({ return: data.sid ? true : false, message: data.message || 'sent' });
  } catch (e) {
    res.json({ return: false, message: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
