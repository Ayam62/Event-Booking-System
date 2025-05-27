# Event Booking System

A robust Node.js/Express backend for managing events, user authentication, admin controls, event bookings, payments, and email notifications. This project is designed for learning scalable backend patterns, and is a great foundation for e-commerce or event management platforms.

---

##  Features

- **User Authentication & Authorization**
  - Register, login, logout, password reset
  - JWT-based authentication
  - Role-based access (admin, user)

- **Admin & User Management**
  - Admin can view, update, delete, and promote users
  - User profile view and update

- **Event Management**
  - Admin/organizer can create, update, and delete events
  - Events include title, description, date, seat management, price, organizer, and status

- **Event Discovery**
  - Public event listing with search and filter by title, date, organizer
  - Pagination support

- **Booking System**
  - Users can book events and manage their bookings
  - Prevents overbooking with seat availability checks
  - Organizers can view attendees for their events

- **Payment Integration**
  - Stripe Checkout for secure payments

- **Email Notifications**
  - Email confirmations for bookings, cancellations, and password resets (via Nodemailer)

---

##  Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB
- Stripe account (for payments)
- Gmail account (for email notifications)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ayam62/event-booking-system.git
   cd event-booking-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add:

   ```
   PORT=8001
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL=your_gmail_address
   PASSWORD=your_gmail_app_password
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

---

##  API Overview

- **Auth:** `/api/auth`
- **Events:** `/api/events`
- **Bookings:** `/api/bookings`
- **Users:** `/api/users`
- **Admin:** `/api/admin`
- **Payments:** `/api/payments`

---

## 📁 Project Structure

```
/controller      # Route controllers
/models          # Mongoose models
/routes          # Express routes
/middleware      # Auth and role middleware
/utils           # Utility functions (email, etc.)
/config          # Database config
```

---

##  Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

##  Acknowledgements

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Stripe](https://stripe.com/)
- [Nodemailer](https://nodemailer.com/)
