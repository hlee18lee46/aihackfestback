# 🧠 TravelJournal Backend

This is the Node.js + Express backend for **TravelJournal**, a privacy-first AI travel assistant. It handles AI itinerary generation, secure journaling, SHA-256 hashing, and smart contract anchoring to the Midnight blockchain (devnet).

---

## 🚀 Features

- ✍️ Create private travel journal entries
- 🪙 Hash entries and anchor them on the Midnight blockchain (mock tx)
- 🔐 Store anchor metadata in MongoDB
- 🧠 Generate itineraries using Gemini (Google Generative AI)
- 🧾 Fetch anchor history by user ID
- 🌐 CORS-enabled for frontend integration

---

## 📦 Tech Stack

- **Node.js + Express** — Backend API server
- **MongoDB Atlas** — Journal + user + anchor storage
- **Midnight SDK** — Blockchain anchoring (devnet)
- **Google Gemini API** — Travel itinerary suggestions
- **Docker** — Midnight local node simulation

---

## ⚙️ Local Development

### 1. Install dependencies

```bash
npm install


### Setup .env file
MONGO_URI=your_mongodb_atlas_uri
SEED_HEX=your_wallet_seed_hex
GEMINI_API_KEY=your_google_generative_ai_key

Start the server with
node server.js
