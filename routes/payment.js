const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const auth = require('../middleware/auth');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();

const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT;
const PAYPAL_API = process.env.PAYPAL_API;
const SALT_KEY = process.env.PHONEPE_API_KEY;
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_INDEX = process.env.PHONEPE_KEY_INDEX;
const MAX_RETRIES = process.env.PHONEPE_MAX_RETRIES;
const PROD_URL = process.env.PHONEPE_URL;

console.log('PayPal API:', PAYPAL_API);
console.log('PAYPAL_SECRET', PAYPAL_SECRET);
console.log('PAYPAL_CLIENT', PAYPAL_CLIENT);



router.post('/', auth(), async (req, res) => {
    const { amount, token } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount,
            currency: 'inr',
            source: token,
            description: 'Payment for order',
        });

        res.status(200).send({ success: true, charge });
    } catch (error) {
        console.error('Stripe charge error:', error);
        res.status(500).send({ success: false, error: error.message });
    }
});


router.post('/create-order', async (req, res) => {
    const order = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '10.00'
            }
        }]
    };
    console.log('PayPal API:', PAYPAL_API);

    try {
        const auth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString('base64');
        console.log('Sending request to PayPal API with order:', order);
        
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        });
        
        console.log('PayPal API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('PayPal create order error:', error);
        res.status(500).send({ success: false, error: error.message });
    }
});

router.post('/capture-order', async (req, res) => {
    const { orderID } = req.body;

    try {
        const auth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString('base64');
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('PayPal capture order error:', error);
        res.status(500).send({ success: false, error: error.message });
    }
});


router.post('/api/pay', async (req, res) => {
  try {
      let merchantTransactionId = req.body.transactionId;
      let userId = req.body.userId;
      const data = {
          merchantId: MERCHANT_ID,
          merchantTransactionId: merchantTransactionId,
          merchantUserId: 'MUID' + `${req.body.name}12345`,
          amount: req.body.amount * 100,
          redirectUrl: `http://localhost:5000/status/${merchantTransactionId}/`,
          redirectMode: 'POST',
          mobileNumber: req.body.number,
          paymentInstrument: {
              type: 'PAY_PAGE'
          }
      };
      const payload = JSON.stringify(data);
      const payloadMain = Buffer.from(payload).toString('base64');
      const keyIndex = 1;
      const string = payloadMain + '/pg/v1/pay' + SALT_KEY;
      const sha256 = crypto.createHash('sha256').update(string).digest('hex');
      const checksum = sha256 + '###' + keyIndex;

      const options = {
          method: 'POST',
          url: PROD_URL,
          headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              'X-VERIFY': checksum
          },
          data: { request: payloadMain }
      };

      await axios(options).then(function (response) {
        const allowedOrigins = ['https://nizhaltnpsc.com', 'https://www.nizhaltnpsc.com'];
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        return res.json(response.data);
    
      }).catch(function (err) {
          console.log(err);
          res.status(500).send({ message: `Error processing payment ${err}` });
      });
  } catch (e) {
      console.log(e);
  }
});

router.post('/status/:transactionId/', async (req, res) => {
    const merchantTransactionId = req.params.transactionId; 
    const merchantId = MERCHANT_ID;
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;
    console.log("merchantId",merchantId)
    console.log("checksum",checksum)
    const options = {
        method: 'GET',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };
  console.log(options)
    let attempts = 0;
    const maxAttempts = 30; 
  
    const pollPaymentStatus = async () => {
        try {
            const response = await axios.request(options);
            console.log(response)
            if (response.data.code === "PAYMENT_SUCCESS") {
                const paymentData = response.data;
               console.log("Payment success")
                clearInterval(interval);
                // const successUrl = 'https://nizhaltnpsc.com/payment/success';
                // return res.redirect(successUrl);
                res.send({ success: true, data: paymentData });
            } else if (attempts >= maxAttempts) {
                clearInterval(interval); 
                res.send({ success: false, error: 'Payment failed' });
                // const failureUrl = 'https://nizhaltnpsc.com/payment/failure';
                // return res.redirect(failureUrl);
            }
        } catch (error) {
            console.error('Error verifying payment status:', error);
            clearInterval(interval); 
            res.send({ success: false, error: error.message });
            // const failureUrl = 'https://nizhaltnpsc.com/payment/failure';
            // return res.redirect(failureUrl);
        }
    };
  
    const interval = setInterval(async () => {
        attempts++;
        await pollPaymentStatus();
    }, 3000);
  
    await pollPaymentStatus();
  });

module.exports = router;
