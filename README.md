# Next.js Identity Project

A secure identity management system built with Next.js and PostgreSQL. This project includes user registration, login, two-factor authentication (2FA), and rate limiting to enhance security and user experience.

## Features

- **User Registration**: Users can sign up with email and password.
- **User Login**: Secure login system with JWT authentication.
- **Two-Factor Authentication (2FA)**: Enhanced security using 2FA for user logins.
- **Rate Limiting**: Prevents abuse and protects against brute-force attacks.
- **PostgreSQL**: Utilizes PostgreSQL for user data storage.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering.
- [Node.js](https://nodejs.org/) - JavaScript runtime for the backend.
- [PostgreSQL](https://www.postgresql.org/) - Relational database for user data.
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication.
- [Nodemailer](https://nodemailer.com/) - For sending emails (e.g., for 2FA).
- [Redis](https://redis.io/) - Optional, for caching and rate limiting.

## Getting Started

### Prerequisites

- Node.js (version 14 or above)
- PostgreSQL (make sure to have a database setup)
- An Upstash Redis account (if using Redis for caching/rate limiting)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ahtaxam/identity-tech.git
   cd identity-tech
   ```

2. Install dependencies:
 ```bash 
npm install
```
3. Create a .env.local file in the root directory and add your environment variables:
```bash


# SMTP Configuration for sending emails
SMTP_HOST=        
SMTP_USER=your-email@example.com   
SMTP_PASS=your-email-password       
JWT_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```
4. Create a .env file in the root directory Prisma orm will set database url from that
```bash
DATABASE_URL=
```
5. Start the development server:
```bash
npm run dev
```
6. Navigate to http://localhost:3000 in your browser.