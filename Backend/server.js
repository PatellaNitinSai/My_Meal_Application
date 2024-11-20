require('dotenv').config();

const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;
const Menu = require('./Routes/Menu');
const user = require('./Routes/user');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Define your storeItems map with predefined items
const storeItems = new Map([
  [1, { priceInCents: 10000, itemName: "Learn React Today" }],
  [2, { priceInCents: 20000, itemName: "Learn CSS Today" }],
  // Add more entries as needed
]);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/menu', Menu);
app.use('/login',user);
connectDB();
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// ...

// ... (previous code)


// ... (previous code)

app.post("/create-checkout-session", async (req, res) => {
  try {
      const { items,amount } = req.body;

      console.log('Received items:', items);

      const lineItems = items.map(item => {
          const unitAmount = (amount*100)/items.length; // Adjust as needed

          return {
              price_data: {
                  currency: "inr",
                  product_data: {
                      name: item.itemName,
                      itemPrice: item.price,
                  },
                  unit_amount: unitAmount,
              },
              quantity: item.quantity,
          };
      });

      const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: lineItems,
          success_url: `${process.env.CLIENT_URL}/success.html`,
          cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      });

      res.json({ url: session.url });
  } catch (e) {
      console.error('Error creating checkout session:', e);
      res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server connected on port: ${PORT}`);
});
