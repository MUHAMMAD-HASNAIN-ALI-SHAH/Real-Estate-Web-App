# 🏠 Real Estate Website

This is a full-stack Real Estate web application that allows users to sign up, create listings, get their properties booked by others, and receive ratings after bookings. The platform provides a smooth and intuitive interface for both property owners and seekers.

---

## 🚀 Features

### 🔐 User Authentication
- Secure sign-up and login functionality using JWT.

### 📋 Listing Management
- Users can create listings with details like title, description, price, location, and images.
- Listings can be edited or deleted by the owner.

### 📆 Booking System
- Users can browse listings and book properties.
- Each booking stores relevant user and listing info.

### ⭐ Ratings and Reviews
- Users can leave ratings and reviews after completing bookings.
- Ratings help future users make informed decisions.

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS or Mantine UI
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Cloudinary (for image uploads)

### Authentication
- JWT for secure auth
- Bcrypt for password hashing

---

## 📦 Project Structure

```bash
real-estate-website/
├── client/            # React Frontend
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── package.json
│
├── backend/           # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
├── README.md
└── .gitignore
```bash

## How to run this project

### First start backend server
-- 1. create a .env file in backend with this fields
--    PORT=3000
--    JWT_SECRET=
--    CLOUDINARY_CLOUD_NAME=
--    CLOUDINARY_API_KEY=
--    CLOUDINARY_API_SECRET=
--    MONGO_URI=

-- 2. cd backend
-- 3. npm install
-- 3. npx nodemon index.js

### Second start frontend server
-- 1. cd frontend
-- 2. npm install
-- 3. npm run dev

