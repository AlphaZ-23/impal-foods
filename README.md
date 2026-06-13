# Impal Foods – Full MERN Website

A dynamic business website for Impal Foods (Sugar & Poha wholesaler) with a public site and a secure admin panel.

## Stack
- MongoDB (Mongoose)
- Express.js
- React (Vite + Tailwind CSS)
- Node.js
- JWT authentication, Multer for image uploads

## Project Structure
```
impal-foods/
  server/   -> Express + MongoDB API
  client/   -> React frontend (Vite)
```

## Setup

### 1. Backend
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, admin credentials
npm install
npm run seed   # creates admin user, default content, sample products
npm run dev    # starts server on http://localhost:5000
```

### 2. Frontend
```bash
cd client
npm install
npm run dev    # starts on http://localhost:5173
```

The Vite dev server proxies `/api` and `/uploads` requests to `http://localhost:5000`.

## Admin Access
- URL: `http://localhost:5173/admin/login`
- Username: value of `ADMIN_EMAIL` in `.env` (default: `admin`)
- Password: value of `ADMIN_PASSWORD` in `.env` (default: `admin123`)

**Change these credentials before deploying.**

## Admin Panel Features
- Dashboard with product stats
- Add / edit / delete products (Sugar, Poha) with multi-image upload
- Mark products as "Featured" (shown on Home page)
- Edit company info, About Us (story, mission, vision, manufacturing process)
- Edit certification/quality content and FSSAI verified toggle
- Edit contact details and Google Maps embed URL

## Public Pages
- Home – hero, brand strengths, featured products, CTA
- About Us – story, mission, vision, manufacturing process
- Products – filterable by category, product detail page with image gallery
- Certifications & Quality – FSSAI badge, quality assurance points
- Contact Us – address, phone, email, embedded map

## Notes
- All content (except product images) is editable via the admin panel — no code changes needed.
- Uploaded product images are stored in `server/uploads/` and served statically at `/uploads/...`.
- For production, deploy the API separately (e.g. Render/Railway) and the React build (e.g. Vercel/Netlify), updating the API base URL accordingly.
