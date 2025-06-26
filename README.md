
# 🚖 VeloRide - Uber Clone

VeloRide is a full-stack real-time ride-hailing web app (like Uber) built using **MERN Stack** with **Socket.IO** integration. It supports geolocation, ride requests, captain tracking, and OTP-based ride verification.

---

## 🌐 Live Deployment

- **Frontend:** Vercel (e.g., `https://veloride-frontend.vercel.app`)
- **Backend:** Render (e.g., `https://veloride-backend.onrender.com`)

---

## 🛠️ Tech Stack

| Layer      | Technology                             |
|------------|----------------------------------------|
| Frontend   | React.js, Tailwind CSS, Axios, GSAP    |
| Backend    | Node.js, Express.js, MongoDB, Mongoose |
| Real-time  | Socket.IO                              |
| Geocoding  | LocationIQ, OpenRouteService APIs      |
| Hosting    | Vercel (frontend), Render (backend)    |

---

## ✨ Features

- 👨‍✈️ Captain & User login/signup
- 📍 Geolocation-based captain discovery
- 🚗 Vehicle types with dynamic fare
- 📦 Ride request panel for captains (scrollable queue)
- ✅ OTP-based ride confirmation
- 🔄 Live location updates from captain
- 🔔 Real-time ride push using Socket.IO
- ❌ Realtime cleanup of accepted rides from others’ queues
- 🔐 JWT-based authentication

---

## 🧭 Project Structure

\`\`\`
/frontend
  ├── src/
  │   ├── context/           // User & Captain Context
  │   ├── pages/             // CaptainHome, Home, etc.
  │   ├── components/        // RideCard, WaitingPanel, etc.
  │   ├── SocketContext.jsx  // Global socket manager
  │   └── App.jsx            // Routing setup
/backend
  ├── controllers/           // ride.controller.js etc.
  ├── routes/                // All REST APIs
  ├── models/                // Captain, User, Ride
  ├── services/              // ride.service.js, location.service.js
  ├── socket.js              // Socket.IO init and events
  └── server.js              // App entry point
\`\`\`

---

## 🚀 How to Run Locally

### 🖥 Frontend

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Set up `.env`:

\`\`\`
VITE_BASE_URL=https://your-backend-url/api
VITE_BASE_URL_1=https://your-backend-url
\`\`\`

---

### 🔧 Backend

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

Set up `.env`:

\`\`\`
PORT=3000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/db
JWT_SECRET=yourSecret
LOCATIONIQ_API_KEY=yourKey
ORS_API_KEY=yourKey
\`\`\`

---

## 📱 How It Works

1. User enters pickup and destination.
2. Fare is fetched via OpenRouteService.
3. User confirms → ride is created → nearby captains receive it.
4. Captain sees queue of ride cards.
5. Captain accepts one ride → other captains lose it.
6. User sees "Waiting for Driver" with OTP.
7. Captain enters OTP to start ride.

---

## 🧪 Testing

- Switch between user and captain tabs to simulate real-time behavior.
- Use developer tools to simulate different locations (for captain geolocation).
- Verify OTP validation before ride starts.

---

## ⚙️ Future Improvements

- 🚕 Add ride completion and payment
- 📍 Map-based live tracking
- 📱 React Native app version
- 📊 Captain earnings dashboard
- 🌐 Multilingual support

---

## 🙏 Credits

Created by [Your Name]

Special thanks to:
- LocationIQ
- OpenRouteService
- GSAP
- MongoDB Atlas
- Render & Vercel
