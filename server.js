const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// Convert any body tag received to JSON format
app.use(bodyParser.json());
// Ensure whatever URL strings going out or coming in does not contain any symbols or special characters
app.use(bodyParser.urlencoded({ extended: true }));

// Allow cross-origin requests
app.use(cors());

// Serve client application
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Any route, do this by default
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running at port ${port}`);
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'inr',
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      console.log('stripe error', stripeErr);
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
