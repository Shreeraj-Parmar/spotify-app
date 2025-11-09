import express from 'express';
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import querystring from "querystring";
import cookieParser from "cookie-parser";


// Router
import spotifyRouter from './routes/spotify.js';
import playerRouter from './routes/player.js';

// Helpers
import { getAccessToken } from './helper/spotify.js';


// Configure environment variables
configDotenv();


// Scopes required for Spotify API
const scopes = [
    "user-follow-read",
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state"
].join(" ");


// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());


// Create Spotify Router

// Use the Spotify router for "/spotify" route

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.use('/spotify', spotifyRouter);
app.use('/', playerRouter);

/**
 * "/login" route
 * Redirects user to Spotify authorization page
 */
app.get('/login', (req, res) => {
    const redirectUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scopes,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI
    })}`;

    res.redirect(redirectUrl);
})


/**
 * "/callback" route
 * Handles Spotify callback and exchanges code for access token
 */
app.get('/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const tokenResponse = await getAccessToken(code);

        res.cookie('spotify_access_token', tokenResponse, { httpOnly: true, sameSite: 'Strict', maxAge: 1000 * 60 * 60 });

        setTimeout(() => {
            res.redirect('/spotify');
        }, 1000);

    } catch (error) {
        console.error("Error exchanging code for token:", error.response?.data);
        res.status(400).send("Error during authentication");
    }
});



// Define a port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Spotify Server is running on port ${PORT}`);
});

