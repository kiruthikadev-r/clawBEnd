E-Commerce Platform with Advanced Features
Overview
This repository contains a comprehensive e-commerce platform built with Node.js, integrating Stripe for payment processing. The application offers user management, product listings, shopping cart functionality, order management, session tracking, and deployment on Render and Netlify.

Features
User Management: Registration, login, and role-based access control.
Product Management: Admin users can create, read, update, and delete products.
Shopping Cart: Users can add products to their cart, view their cart, and place orders.
Order Management: Users can view their past orders.
Payment Integration: Secure payment processing using Stripe.
Session Management: Track user sessions with login and logout timestamps.

Technologies Used
Node.js
Express.js
MongoDB
Stripe (for payment processing)
Supabase (for authentication)
Mongoose (for MongoDB interactions)
Deployment on Render and Netlify

Getting Started
Prerequisites
Node.js
MongoDB (local or cloud instance)
Stripe account for payment processing
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/kiruthikadev-r/clawBEnd.git
cd ecommerce-platform/backend
Install dependencies:

bash
Copy code
npm install
Set up your environment variables:

Create a .env file in the root of your project and add the following:

env
Copy code
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
Running the Application
Start the server:

bash
Copy code
npm start
The server will run on http://localhost:5000.

API Endpoints
POST /register: Register a new user.
POST /login: Log in an existing user and create a session.
POST /products: Create a new product (admin only).
GET /products: Retrieve all products.
PUT /products/
: Update a product by ID (admin only).
DELETE /products/
: Delete a product by ID (admin only).
POST /cart: Add a product to the shopping cart.
GET /cart: Retrieve the user's shopping cart.
POST /orders: Place an order.
GET /orders: Retrieve all orders for the logged-in user.
GET /sessions: Retrieve all user sessions.
POST /payment: Process a payment through Stripe.
Deployment
Backend
Deploy the backend on Render following the instructions provided on their website.
Frontend
Create a front-end interface for managing products, shopping cart, and orders, and deploy it on Netlify.
Documentation
Comprehensive API documentation with example requests and responses is provided in the docs folder.
Deployment steps are outlined within this README.
Role-based access control is implemented to ensure security.


1. API Endpoints:
*POST /register: Register a new user.

POST http://localhost:5000/auth/register
Content-Type: application/json

{
    "username": "priya",
    "email": "user@gmail.com",
    "password": "1234@Kiruthika",
    "role":"user"
}

//response
user@gmail registered successfully

* POST /login: Log in an existing user and create a session.

POST http://localhost:5000/auth/login
Content-Type: application/json

{
    
    "email": "ravikumar@gmail.com",
    "password": "1234@Kiruthika"
    
}

//response
{
    "token": "eyJhbGoiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiNmQ5OTQ2NWUxNmMzNjQxYTUwYjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgyNzB9.WaogkgJ8fA4X5zjAK75o8oI7LEgFrkLigb7lOeUxvHc",
    "role": "admin"
  }


  * GET /products: Retrieve all products.

  GET http://localhost:5000/products/
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiNmQ5OTQ2NWUxNmMzNjQxYTUwYjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI1MTk2MjB9.OntXEd5qvs2fCK4Bc-SfU77fe_EqB8X8qFt48-4sLrE
  
//   response

[
    {
      "_id": "66ab917d17e03f13e28ae77c",
      "title": "E-Commerce",
      "categories": [
        {
          "_id": "66b098a6e5e7adc17a190925",
          "name": "Fruits & Vegetables",
          "products": [
            {
              "id": 5,
              "name": "Mango",
              "weight": "1kg",
              "price": "₹250",
              "image": "https://new-assets.ccbp.in/frontend/react-js/nxt-mart-app/image_5.jpg",
              "_id": "66af8ba2bc1eae2c9f236707"
            },
        ]
    }
  ],
  "__v": 21
}
]


* POST /products: Create a new product (admin only).

POST http://localhost:5000/products/category/Cold%20Drinks%20%26%20Juices/product
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiNmQ5OTQ2NWUxNmMzNjQxYTUwYjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI1OTQ0NDd9.0DoAb_ilfKtCHDf68-l8ReZclXaeeMicl4aJO31PyAY

{
    "id": 769,
    "name": "waterMelonJuiceWithIce",
    "weight": "140l",
    "price": "2999",
    "image": "https://justhomemade.wordpress.com/wp-content/uploads/2011/01/pongal-chutney-manjal.jpg"
  }

  //response

  {
    "id": 769,
    "name": "waterMelonJuiceWithIce",
    "weight": "140l",
    "price": "2999",
    "image": "https://justhomemade.wordpress.com/wp-content/uploads/2011/01/pongal-chutney-manjal.jpg"
  }


  * PUT /products/:id: Update a product by ID (admin only).

  PUT http://localhost:5000/products/category/Cold%20Drinks%20%26%20Juices/product/769
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiNmQ5OTQ2NWUxNmMzNjQxYTUwYjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI3NTA5NDN9.hnyZpGVskBsH6L59Rx3oai42JN8xm_zaGntFG1tSbbU
  
  {
      "id": "769",
      "name": "waterMelonJuiceWithIce",
      "weight": "14l",
      "price": "99",
      "image": "https://justhomemade.wordpress.com/wp-content/uploads/2011/01/pongal-chutney-manjal.jpg"
    }
  
//response

{
    "id": 769,
    "name": "waterMelonJuiceWithIce",
    "weight": "14l",
    "price": "99",
    "image": "https://justhomemade.wordpress.com/wp-content/uploads/2011/01/pongal-chutney-manjal.jpg",
    "_id": "66b09a3f7de1f213a3a1eef7"
  }

  * DELETE /products/:id: Delete a product by ID (admin only).

DELETE http://localhost:5000/products/category/Cold%20Drinks%20%26%20Juices/product/769
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiNmQ5OTQ2NWUxNmMzNjQxYTUwYjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI1OTQ0NDd9.0DoAb_ilfKtCHDf68-l8ReZclXaeeMicl4aJO31PyAY

//response
  Product with ID 769 deleted successfully



  * GET /orders: Retrieve all orders for the logged-in user.

GET  http://localhost:5000/orders/orders
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiNmQ5OTQ2NWUxNmMzNjQxYTUwYjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI1OTQ0NDd9.0DoAb_ilfKtCHDf68-l8ReZclXaeeMicl4aJO31PyAY


//response

[
    {
      "_id": "66af7a0c081a61b1ef8d83c1",
      "userId": "66ab6d99465e16c3641a50b8",
      "products": [
        {
          "productId": "5",
          "name": "Mango",
          "weight": "1kg",
          "price": 250,
          "quantity": 1,
          "image": "https://new-assets.ccbp.in/frontend/react-js/nxt-mart-app/image_5.jpg",
          "_id": "66af7a0c081a61b1ef8d83c2"
        },
        {
          "productId": "6",
          "name": "Watermelon",
          "weight": "1pc",
          "price": 50,
          "quantity": 1,
          "image": "https://new-assets.ccbp.in/frontend/react-js/nxt-mart-app/image_6.jpg",
          "_id": "66af7a0c081a61b1ef8d83c3"
        }
        "totalAmount": 590,
    "__v": 0
  
]}]


* POST /orders: Place an order.


POST http://localhost:5000/orders/
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiNmQ5OTQ2NWUxNmMzNjQxYTUwYjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI3NTA5NDN9.hnyZpGVskBsH6L59Rx3oai42JN8xm_zaGntFG1tSbbU

{
    "id": "769",
    "name": "waterMelonJuiceWithIce",
    "weight": "14l",
    "price": "99",
    "image": "https://justhomemade.wordpress.com/wp-content/uploads/2011/01/pongal-chutney-manjal.jpg"
  }

  //response

  productId 769 added successfully


* POST /payment: Process a payment through the external payment gateway.
POST http://localhost:5000/payment
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiNmQ5OTQ2NWUxNmMzNjQxYTUwYjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI1OTQ0NDd9.0DoAb_ilfKtCHDf68-l8ReZclXaeeMicl4aJO31PyAY

{
  "amount": 5000,
  "token": "tok_visa" 
  }

  //response
  {
    "success": true,
    "charge": {
      "id": "ch_3PkNAjCJZrsO62d312uqnh8z",
      "object": "charge",
      "amount": 5000,
      "amount_captured": 5000,
      "amount_refunded": 0,
      "application": null,
      "application_fee": null,
      "application_fee_amount": null,
      "balance_transaction": "txn_3PkNAjCJZrsO62d31Hm8orZl",
      "billing_details": {
        "address": {
          "city": null,
          "country": null,
          "line1": null,
          "line2": null,
          "postal_code": null,
          "state": null
        },
    }}}

    * GET /sessions: Retrieve all user sessions
GET http://localhost:5000/sessions
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiNmQ5OTQ2NWUxNmMzNjQxYTUwYjgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI1OTQ0NDd9.0DoAb_ilfKtCHDf68-l8ReZclXaeeMicl4aJO31PyAY

//response 


[
    {
      "_id": "66ace8548a2badfb54e57191",
      "userId": "66ab6d99465e16c3641a50b8",
      "ipAddress": "::ffff:127.0.0.1",
      "loginTime": "2024-08-02T14:08:20.617Z",
      "__v": 0
    },
    {
      "_id": "66acec4930714b1673e88ef7",
      "userId": "66ab6d99465e16c3641a50b8",
      "ipAddress": "::1",
      "loginTime": "2024-08-02T14:25:13.816Z",
      "__v": 0
    }, ....
  ]




