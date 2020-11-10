  
const express = require('express');
const cors = require('cors');
const paystack = require('paystack')('sk_test_0b356bc05b53551eb09a1f079b2d62ab545c0bd0');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.post('/api/pay', async(request, response) => {
  const { reference, accessCode, email, amount } = request.body;
  console.log('body', request.body);

  try {
    const res = await paystack.transaction.charge({
      reference,
      authorization_code: accessCode,
      email,
      amount,
    })
    console.log(res)
    response.send({ message: 'Payment Made' });
  } catch (err) {
    console.log(err);
  }
})

app.get('/api/test', (request, response) => {
  response.send({ message: 'Live and active' });
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
