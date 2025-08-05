# ⛽ Historical Token Price Oracle with Interpolation Engine

This project provides a **real-time and historical price oracle** for tokens using Alchemy API, with **scheduled backfilling**, **caching via Redis**, and **interpolation** to fill gaps. Includes a beautiful Next.js frontend to visualize historical price data and simulate wallet gas costs.

---

## 📁 Project Structure

📦 Historical Token Price Oracle with Interpolation Engine

```sh
├── backend
│ ├── src
│ │ ├── controllers/
│ │ ├── jobs/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── utils/
│ │ ├── config/
│ │ └── index.ts
│ ├── .env
│ └── package.json
├── frontend
│ ├── app/
│ ├── components/
│ ├── lib/
│ ├── hooks/
│ ├── styles/
│ ├── public/
│ └── package.json
├── README.md
└── .gitignore
```

## 🚀 Features

### 🧠 Backend
- 📊 Fetches token price data using **Alchemy SDK**
- 🔁 Scheduled jobs to backfill historical price data (BullMQ + Redis)
- 🧮 Linear **interpolation** for missing timestamps
- 🧠 **Caching** with Redis for performance
- 🛢 Stores price points in MongoDB

### 💻 Frontend
- ⚡ Real-time chart updates using `lightweight-charts`
- 🔁 Chain selection (Ethereum, Polygon, Arbitrum)
- 🧮 Wallet simulation (gas estimation with historical data)
- 🌐 Built using **Next.js 14**, `ethers.js`, and `zustand`

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites

- Node.js (v18+)
- Redis
- MongoDB
- Alchemy API Key

---

### 1. Clone the Repository
git clone https://github.com/VenkyRock143/Historical-Token-Price-Oracle-with-Interpolation-Engine
cd historical-price-oracle

2. Setup Backend
cd backend
cp .env.example .env
# Fill in your MongoDB URI, Redis URL, and Alchemy Key

npm install
npm run dev

📌 Backend .env Example
```sh
PORT=4000
MONGO_URI=mongodb://localhost:27017/token_oracle
REDIS_URL=redis://localhost:6379
ALCHEMY_API_KEY=your_alchemy_key_here
QUEUE_NAME=price-fetch-queue
```

3. Setup Frontend
cd ../frontend
npm install
npm run dev


🧰 Tech Stack
Layer	Tools
Backend	Node.js, Express, Alchemy SDK
Job Queue	BullMQ, Redis
Database	MongoDB
Frontend	Next.js, Zustand, ethers.js
Charts	lightweight-charts
