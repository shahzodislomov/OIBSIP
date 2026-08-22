# PizzaCraft - Artisanal Stone-Fired Pizza Delivery Application

A full-stack, production-grade pizza ordering and real-time inventory platform built with **Next.js 16 (App Router, Turbopack)**, **Node.js**, **Express**, **MongoDB (Mongoose)**, **Socket.IO**, **anime.js**, and **Razorpay Payment Gateway Integration**.

---

## Key Features

### Frontend & UI Design System
- **Obsidian Dark & Copper Theme**: Custom HSL color design tokens, glassmorphism panels, crimson/amber borders, and smooth custom scrollbars.
- **Ambient Bokeh Background Animation**: Interactive warm glowing Bokeh particle light orbs powered by `anime.js`.
- **Interactive 2D Custom Pizza Builder**: Visual layer-by-layer canvas customizer (Crust, Sauce, Cheese, Veggies, Meats) with instant price calculations and topping chips.
- **Dynamic Storefront Menu**: Category pill tabs, real-time search filtering, price/rating sorting, dietary badges (Vegetarian / Spicy), and crust size option modals.
- **Shadcn-Inspired UI Components**: Custom `Button`, `Card`, `Badge`, `Input`, `Dialog`, and global `Toast` notification provider.
- **ReactBits Interactive Animations**:
  - `MagnetButton`: Mouse cursor magnetic spring effect using `anime.js`.
  - `SpotlightCard`: Cursor-following radial spotlight glass glow.
  - `DecryptedText`: Cyberpunk matrix text scramble effect on mount & hover.
  - `SplitText`: Staggered character slide-up title animation.

---

### Backend & Real-Time API Architecture
- **RESTful API**: Clean Express controllers and models for Pizzas, Inventory Ingredients, Orders, Payments, and Admin Analytics.
- **JWT & Password Security**: Password hashing with `bcryptjs` (10 salt rounds) and signed 7-day JWT authentication tokens.
- **Email Verification Flow**: Token-based email verification flow with console link logging during development and Nodemailer SMTP integration.
- **Automatic Stock Deduction**: Automatically decrements ingredient stock quantities in MongoDB upon user order placement.
- **Razorpay Test Payment Integration**:
  - Backend `razorpay` SDK order creation (`POST /api/payments/create-order`).
  - Frontend Razorpay checkout popup script handler (`https://checkout.razorpay.com/v1/checkout.js`).
  - HMAC-SHA256 signature verification (`POST /api/payments/verify`) using `crypto`.
- **Real-time Socket.IO Live Order Tracker**: Socket.IO room broadcast (`order_${id}`) for instant status progression (Received -> Preparing -> Baking -> Out for Delivery -> Delivered) with celebratory `canvas-confetti`.
- **Background Stock Monitoring**: Periodic `node-cron` job running every 30 minutes to audit inventory against thresholds and trigger low-stock alerts.
- **Auto-Database Seeding**: Automatically seeds initial artisanal pizza menu items, ingredient stock levels, and a default Admin User (`admin@pizzacraft.com` / `admin123`) on server boot.

---

### Admin Operations & Route Protection
- **`AdminGuard` Route Protection**: Next.js client-side authorization guard protecting all `/admin/*` sub-pages.
- **Admin Dashboard (`/admin`)**: Revenue statistics, active kitchen order counters, and low-stock warning banners.
- **Inventory Management (`/admin/inventory`)**: Stock level monitoring table, instant stock refill buttons, and custom ingredient creator modal.
- **Kitchen Orders Controller (`/admin/orders`)**: Live order status switcher broadcasting real-time Socket.IO updates to connected customers.

---

## Technology Stack

### Frontend (`pizza-delivery-frontend`)
- **Framework**: Next.js 16.3.2 (App Router, Turbopack)
- **Library**: React 19, TypeScript
- **Styling**: TailwindCSS 4, Custom CSS Glassmorphism
- **Animations**: `animejs` (v4), `canvas-confetti`
- **State Management**: Zustand (with `localStorage` persistence)
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend (`pizza-delivery-backend`)
- **Runtime**: Node.js, Express.js
- **Database**: MongoDB & Mongoose ORM
- **Real-time**: Socket.IO (Server & Client)
- **Payments**: Razorpay Node SDK
- **Task Scheduling**: `node-cron`
- **Mail Service**: Nodemailer
- **Security**: `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`

---

## Default Admin Credentials

For fast access to the Admin Portal, use the built-in auto-seeded credentials:

| Field | Credentials |
| :--- | :--- |
| **Email** | `admin@pizzacraft.com` |
| **Password** | `admin123` |
| **Role** | `admin` |
| **Direct Access** | [http://localhost:3000/admin](http://localhost:3000/admin) |

---

## Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Instance (Local MongoDB or MongoDB Atlas URI)

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd WebDev-Task1-PizzaDelivery/pizza-delivery-backend

# Install dependencies
npm install

# Create .env file in pizza-delivery-backend/.env
cat <<EOT > .env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_MONGO_URI
JWT_SECRET=your_jwt_secret_key_12345
FRONTEND_URL=http://localhost:3000
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_SECRET
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
EMAIL_FROM="PizzaCraft" <noreply@pizzacraft.com>
EOT

# Start backend server
node src/server.js
# Or with nodemon for hot-reloading:
npm run dev
```

---

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd ../pizza-delivery-frontend

# Install dependencies
npm install

# Create .env.local file in pizza-delivery-frontend/.env.local
cat <<EOT > .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
EOT

# Start Next.js development server
npm run dev

# Or build for production:
npm run build
npm run start
```

---

## Project Structure

```text
WebDev-Task1-PizzaDelivery/
├── pizza-delivery-backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection helper (db.js)
│   │   ├── controllers/     # API controllers (pizza, inventory, order, payment, auth, admin)
│   │   ├── jobs/            # Node-cron background jobs (stockCron.js)
│   │   ├── middleware/      # JWT authentication & admin authorization (authMiddleware.js)
│   │   ├── models/          # Mongoose Schemas (User, Pizza, Ingredient, Order)
│   │   ├── routes/          # Express API routes
│   │   ├── services/        # Nodemailer email verification service
│   │   ├── socket.js        # Socket.IO real-time event handler
│   │   └── server.js        # Server boot file with auto-seeding & port error handling
│   └── .env
│
├── pizza-delivery-frontend/
│   ├── app/
│   │   ├── (main)/          # Storefront pages (Home, Menu, Custom Builder, Checkout, Orders)
│   │   ├── admin/           # Admin Portal (/admin, /admin/inventory, /admin/orders)
│   │   ├── globals.css      # Theme system, dark tokens, glassmorphism, keyframes
│   │   └── layout.tsx       # Root layout with site shell, header & toast provider
│   ├── components/
│   │   ├── animations/      # MagnetButton, SpotlightCard, DecryptedText, SplitText, FloatingPizzas
│   │   ├── auth/            # AdminGuard route protection wrapper
│   │   ├── ui/              # Button, Card, Badge, Input, Dialog, Toast
│   │   ├── site-header.tsx  # Sticky glass navbar with live cart badge & user menu
│   │   ├── cart-drawer.tsx  # Slide-over cart drawer with free delivery progress bar
│   │   └── site-shell.tsx   # Application shell wrapper & footer
│   ├── stores/              # Zustand cartStore & authStore with persistence
│   ├── lib/                 # Class merger (cn), price formatters, Axios API instance
│   └── .env.local
└── README.md
```

---

## API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user & send verification link | Public |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | Public |
| `GET` | `/api/auth/verify-email` | Verify email token | Public |
| `GET` | `/api/pizzas` | Fetch menu catalog (supports search, filter, sort) | Public |
| `GET` | `/api/inventory` | Fetch custom pizza builder ingredients | Public |
| `POST` | `/api/orders` | Create new order & deduct ingredient stock | Required |
| `POST` | `/api/payments/create-order` | Initialize Razorpay order object | Required |
| `POST` | `/api/payments/verify` | HMAC-SHA256 signature verification | Required |
| `GET` | `/api/admin/stats` | Analytics dashboard metrics | Admin Only |
| `PATCH` | `/api/admin/:id/status` | Update kitchen order status | Admin Only |
| `PATCH` | `/api/inventory/:id` | Update ingredient stock levels | Admin Only |

---

## License

Distributed under the MIT License. Built for Oasis Infobyte Web Development Internship Task.
