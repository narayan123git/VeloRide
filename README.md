# 🚖 VeloRide – The Ultimate Uber Clone

**VeloRide** is a full-stack, real-time ride-hailing web application inspired by Uber, built with the modern **MERN Stack** and powered by **Socket.IO** for instant communication.  
It delivers a seamless experience for both riders and captains, featuring live geolocation, dynamic fare calculation, real-time ride requests, and OTP-based ride verification.

---

## 🌐 Live Demo

- **Link:** [Vercel Deployment](https://veloride.vercel.app)

---

## 🛠️ Tech Stack

| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Frontend   | React.js, Tailwind CSS, Axios, GSAP          |
| Backend    | Node.js, Express.js, MongoDB, Mongoose       |
| Real-time  | Socket.IO                                    |
| Geocoding  | LocationIQ, OpenRouteService APIs            |
| Hosting    | Vercel (frontend), Render (backend)          |

---

## ✨ Features

- 👤 **Dual Roles:** Separate flows for Captains (drivers) and Users (riders)
- 📍 **Live Geolocation:** Discover captains near your pickup point
- 🚗 **Multiple Vehicle Types:** Car, Bike, Auto, Taxi – each with dynamic fares
- 💸 **Real-Time Fare Calculation:** Powered by OpenRouteService
- 📦 **Captain Ride Queue:** Captains see a live-updating queue of ride requests
- 🔄 **Live Ride Updates:** Real-time ride status and location updates via Socket.IO
- ✅ **OTP Ride Start:** Secure, OTP-based ride verification before starting
- 🔔 **Instant Notifications:** Push ride requests and updates instantly
- ❌ **Smart Cleanup:** Accepted rides are removed from other captains’ queues in real time
- 🔐 **Secure Auth:** JWT-based authentication for all users

---

## 🧭 Project Structure
/frontend ├── src/ │ ├── context/ // User & Captain Context │ ├── pages/ // Home, CaptainHome, Riding, etc. │ ├── components/ // RideCard, WaitingPanel, etc. │ ├── socket/ // Socket managers │ └── App.jsx // Routing setup /backend ├── controllers/ // ride.controller.js, etc. ├── routes/ // All REST APIs ├── models/ // Captain, User, Ride ├── services/ // ride.service.js, location.service.js ├── socket.js // Socket.IO init and events └── server.js // App entry point


---

## 🚀 Getting Started Locally

### 🖥 Frontend

```bash
cd frontend
npm install
npm run dev
```
- **Set up .env**
VITE_BASE_URL=https://your-backend-url/api
VITE_BASE_URL_1=https://your-backend-url

### 🔧 Backend
```bash
cd backend
npm install
npm run dev
```
- **Set up .env**
PORT=3000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/db
JWT_SECRET=yourSecret
LOCATIONIQ_API_KEY=yourKey
ORS_API_KEY=yourKey

## 📱 How It Works

1. **User** enters pickup and destination addresses.
2. **Fare** is calculated live via OpenRouteService.
3. **Ride request** is created and broadcast to nearby captains in real time.
4. **Captains** see a live-updating queue of ride cards and can accept rides instantly.
5. **User** waits for a captain and receives an OTP for ride verification.
6. **Captain** enters the OTP to start the ride.
7. **Live updates** keep both parties in sync throughout the journey.

---

## 🧪 Testing & Simulation

- Open multiple tabs as user and captain to simulate real-time interactions.
- Use browser geolocation tools to test captain discovery.
- Try the full OTP flow for secure ride start.

---

## ⚙️ Roadmap & Future Enhancements

- 🚕 Ride completion and payment integration
- 🗺️ Live map-based tracking during rides
- 📱 React Native mobile app
- 📊 Captain earnings dashboard
- 🌍 Multilingual support
- 💳 In-app payments

---

## 🙏 Credits

Created by Narayan Paul

Special thanks to:
- [LocationIQ](https://locationiq.com/)
- [OpenRouteService](https://openrouteservice.org/)
- [GSAP](https://greensock.com/gsap/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render](https://render.com/) & [Vercel](https://vercel.com/)

---

## 💡 Why VeloRide?

VeloRide is not just a project—it's a hands-on demonstration of modern web engineering, real-time communication, and scalable architecture for ride-hailing platforms.  
Whether you're a developer eager to learn, a startup seeking a robust foundation, or a tech enthusiast exploring real-time apps, VeloRide gives you a production-ready codebase to build, extend, and innovate on.

**Fork it, run it, and make it your own next-gen ride**