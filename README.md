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
