import axios from "axios";
import { getAllDevices, getTopTracks, playCurruntlyPlayingSongOnSpotify, stopCurrruntPlayingSongOnSpotify } from "../helper/spotify.js";


/**
 * Stop the currently playing song
 * @param {*} req 
 * @param {*} res 
 */
export const stopCurruntlyPlayingSong = async (req, res) => {
    // Get Accesss Token 
    const token = req.cookies['spotify_access_token'];
    await stopCurrruntPlayingSongOnSpotify(token);
    res.status(200).json({ message: 'Playback stopped successfully' });
}


/**
 * Play the currently playing song
 * @param {*} req 
 * @param {*} res 
 */
export const playCurruntlyPlayingSong = async (req, res) => {
    // Get Accesss Token 

    const token = req.cookies['spotify_access_token'];
    await playCurruntlyPlayingSongOnSpotify(token);
    res.status(200).json({ message: 'Playback started successfully' });
}


/**
 * Play any song from top 10 tracks
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const playAnyFromTop10 = async (req, res) => {
    const token = req.cookies['spotify_access_token'];

    try {
        // 1️⃣ Get the user's available devices
        const devicesRes = await getAllDevices(token);

        const activeDevice = devicesRes.find(d => d.is_active);

        if (!activeDevice) {
            return res.status(400).json({
                error: "No active Spotify device found. Open Spotify on any device and play a song once, then try again.",
            });
        }

        // 2️⃣ Get top 10 tracks
        const topTracksRes = await getTopTracks(token);

        const topTracks = topTracksRes.items;
        if (!topTracks || topTracks.length === 0) {
            return res.status(404).json({ error: "No top tracks found for this account." });
        }

        // 3️⃣ Pick a random song and play it
        const randomTrack = topTracks[Math.floor(Math.random() * topTracks.length)];
        const trackUri = `spotify:track:${randomTrack.id}`;

        await axios.put(
            `https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`,
            { uris: [trackUri] },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        res.status(200).json({
            message: `Now playing: ${randomTrack.name} by ${randomTrack.artists[0].name}`,
            track: randomTrack,
        });

    } catch (error) {
        console.error("Error starting playback:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to start playback" });
    }
};
