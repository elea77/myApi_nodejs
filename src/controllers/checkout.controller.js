const stripe = require('stripe')('sk_test_51IYAwmJ5UFJGtqNY5XAkZV7YcOxeb9DBVOYHBpFEQw7Hl5sUOm7Y0MtEEzH8ZMlqhS6SXLlzHYFmxoI1cWvfpcpL00u6751kXb')
require("regenerator-runtime/runtime");

exports.checkout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: process.env.DB_URI.'/success',
    cancel_url: process.env.DB_URI.'/cancel',
  });

  res.json({ id: session.id });
};

