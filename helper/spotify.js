

import axios from 'axios';
import querystring from "querystring";


export const getAccessToken = async (code) => {
    const tokenUrl = "https://accounts.spotify.com/api/token";
    const body = querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    try {
        const response = await axios.post(tokenUrl, body, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        // Returns access_token, refresh_token, expires_in, etc.
        return response.data.access_token;

    } catch (error) {
        console.error("Error fetching Spotify user token:", error.response?.data || error.message);
        throw error;
    }
};


/**
 * Get the list of artists the user follows
 * @param {*} accessToken 
 * @returns {Promise<Object>} list of followed artists
 */
export const getListOfArtistsYouFollow = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching followed artists:', error);
        throw error;
    }
}



export const getTopTracks = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top tracks:', error);
        throw error;
    }
}


export const getCurruntPlayingSong = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching currently playing song:', error);
        throw error;
    }
}



/**
 * Stop the currently playing song
 * @param {*} accessToken 
 */
export const stopCurrruntPlayingSongOnSpotify = async (accessToken) => {
    try {
        await axios.put('https://api.spotify.com/v1/me/player/pause', {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        console.error('Error stopping playback:', error);
        throw error;
    }
}


/**
 *  Play the currently playing song
 * @param {*} req 
 * @param {*} res 
 */
export const playCurruntlyPlayingSongOnSpotify = async (accessToken) => {
    try {
        await axios.put('https://api.spotify.com/v1/me/player/play', {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        console.error('Error starting playback:', error);
    }
}



/**
 *  Get all available devices for the user
 * @param {*} accessToken 
 * @returns 
 */
export const getAllDevices = async (accessToken) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/devices', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        // console.log('Devices response:', response.data.devices);

        return response.data.devices;
    } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
    }
}