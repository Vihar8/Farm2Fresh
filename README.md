# 🌾 Farm2Fresh

> Connecting farmers and buyers directly through a modern agricultural marketplace

---

## 📱 Live Demo
- **Frontend**: [https://farm2fresh.vercel.app](https://farm2fresh.vercel.app)
- **Backend**: [https://farm2fresh-kyhc.onrender.com](https://farm2fresh-kyhc.onrender.com)

---

## 🎯 Project Overview
Farm2Fresh is an agri-tech platform that bridges the gap between farmers and buyers, enabling direct, transparent, and efficient agricultural trading. The platform empowers farmers to list their produce, while buyers can discover, compare, and purchase fresh commodities directly from the source. The system also provides real-time market intelligence, secure authentication, and a robust communication hub.

---

## ✨ Key Features

### For Farmers 👨‍🌾
- **Smart Listings Management**: Create, update, and manage product listings with images and details.
- **Dynamic Pricing**: Set and update prices based on market trends.
- **Performance Tracking**: View listing performance and statistics.

### For Buyers 🏪
- **Advanced Search & Discovery**: Filter products by category, location, and price.
- **Direct Enquiry**: Contact sellers directly for deals and negotiations.

### Market Intelligence 📊
- **Real-time Mandi Prices**: Access live and historical prices from major agricultural markets.
- **Analytics**: Visualize trends and export data.

### Platform Features 🌟
- **Verified Profiles**: Identity verification and professional badges.
- **Communication Hub**: Direct voice calls and WhatsApp chat integration.
- **Secure Authentication**: Email verification, JWT-based login, and role-based access.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18+
- **Styling**: Tailwind CSS, SCSS
- **UI Components**: Material-UI v5, Ant Design
- **Routing**: React Router v7
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, bcryptjs
- **File Storage**: Cloudinary
- **Email**: Nodemailer

### DevOps
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account (for image uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/vihar8/Farm2Fresh.git
cd Farm2Fresh
```

### 2. Backend Setup
```bash
cd Farm2Fresh/F2Fback
cp .env.example .env # Create your .env file and set variables
npm install
npm start
```
- **Environment Variables Required:**
  - `MONGODB_URL` (MongoDB connection string)
  - `JWT_SECRET` (JWT signing key)
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (Cloudinary credentials)

### 3. Frontend Setup
```bash
cd Farm2Fresh/F2Ffront
npm install
npm run dev
```
- The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## 🗂️ Project Structure

```
Farm2Fresh/
  ├── F2Fback/    # Backend (Node.js/Express)
  └── F2Ffront/   # Frontend (React.js)
```

---

## 🔌 Backend API Documentation

### Authentication Routes (`/auth`)
- `POST /auth/signup` — Register a new user (farmer or buyer)
- `POST /auth/verify-email` — Verify user email with code
- `POST /auth/login` — Login and receive JWT
- `POST /auth/profile` — Get user profile (JWT required)
- `GET /auth/buysellacc` — Get user counts by type
- `POST /auth/forgot-password` — Request password reset
- `POST /auth/reset-password` — Reset password
- `DELETE /auth/deleteUser/:id` — Delete a user

### Commodity Routes (`/api`)
- `GET /api/` — Get all commodities (auth required)
- `POST /api/commodities` — Add a new commodity (auth, image upload)
- `GET /api/getSellerCommodities` — Get all seller commodities (auth)
- `GET /api/getBuyerCommodities` — Get all buyer commodities (auth)
- `DELETE /api/deleteCommodity/:id` — Delete a commodity (auth)
- `GET /api/commodities` — Get all commodities for the logged-in user (auth)
- `PUT /api/updateCommodity/:id` — Update a commodity (auth)
- `GET /api/dashboard` — Get dashboard statistics

### Enquiry Routes (`/api/enquiryform`)
- `POST /api/enquiryform/` — Submit an enquiry
- `GET /api/enquiryform/` — Get all enquiries
- `DELETE /api/enquiryform/delete/:id` — Delete an enquiry

---

## 🗃️ Data Models

### User
| Field         | Type    | Description                       |
|--------------|---------|-----------------------------------|
| name         | String  | Full name                         |
| email        | String  | Unique email                      |
| mobile       | String  | Unique 10-digit mobile number     |
| password     | String  | Hashed password                   |
| isVerified   | Boolean | Email verified status             |
| verificationCode | String | Email verification code         |
| role         | Number  | 1 = client, 2 = admin             |
| user_type    | String  | 'buyer' or 'seller'               |

### Commodity
| Field       | Type    | Description                       |
|-------------|---------|-----------------------------------|
| commodity   | String  | Name of the commodity             |
| varietyType | String  | Variety type                      |
| quantity    | Number  | Quantity available                |
| totalIn     | String  | Unit (kg, mt, quintal, ton)       |
| price       | Number  | Price per unit                    |
| state       | String  | State location                    |
| district    | String  | District location                 |
| images      | [String]| Image URLs                        |
| description | String  | Description (optional)            |
| createdBy   | ObjectId| Reference to user                 |

### Enquiry
| Field       | Type    | Description                       |
|-------------|---------|-----------------------------------|
| email       | String  | Email of the enquirer             |
| mobile      | String  | Mobile number                     |
| requirement | String  | Requirement description           |
| createdAt   | Date    | Submission date                   |

---

## 🧑‍💻 Contribution Guidelines

1. Fork the repository and create a new branch for your feature or bugfix.
2. Write clear, concise commit messages.
3. Ensure code passes linting and tests.
4. Submit a pull request with a detailed description of your changes.

---

## 📄 License
This project is licensed under the ISC License.

---

## 🙏 Acknowledgements
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary](https://cloudinary.com/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)
