# 🎵 Spotify Node.js Integration App

A simple Node.js + Express application that connects to Spotify via OAuth, lets you view your followed artists and top tracks, and control playback — including playing or stopping songs directly from the API.

---

## 🚀 Features

✅ **Spotify Login Flow**  
Authenticate with your Spotify account using the official OAuth process.

✅ **Fetch Followed Artists & Top Tracks**  
Once logged in, you’ll automatically get details about your followed artists and favorite songs.

✅ **Playback Controls**

- 🎧 `/play/top` → Play a random song from your top 10 tracks
- ⏸️ `/stop` → Stop the currently playing track
- ▶️ `/play` → Resume the current track

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/Shreeraj-Parmar/spotify-app
```

### 2. Install Dependencies (use node version 24)

```
npm install
```

### 3. Create a .env file in the project root with:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
PORT=3000
```

You can get your Client ID and Secret from the Spotify Developer Dashboard
.

### Start Server

```
npm run dev
```

### 1. Login With Spotify

http://localhost:3000/login

You’ll be redirected to Spotify’s login page.
After successful authentication, you’ll be redirected to: http://localhost:3000/spotify

### 2. Playback Endpoints

Plays a random song from your top 10 tracks.

GET http://localhost:3000/play/top

⏸️ /stop

Stops the currently playing song.
GET http://localhost:3000/spotify/stop

🔁 /play

Resumes the currently playing song.
Example:

GET http://localhost:3000/spotify/play

### ⚠️ Important Notes

You must be logged in before using any /spotify/\* route.

Your session lasts 1 hour — after that, you’ll need to log in again.

You must have an active playback device (e.g., Spotify app open on your phone or desktop).

Spotify Premium is required for playback control endpoints.

### 🧩 Tech Stack

Node.js

Express.js

Axios

Cookie-Parser

Spotify Web API

### 💚 Author

Shreeraj
Building practical apps with clean logic and great UX.
