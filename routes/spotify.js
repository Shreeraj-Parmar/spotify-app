import express from 'express';
import { getMySpotifyDetails } from '../controllers/spotify.js';

const spotifyRouter = express.Router();


// "/spotify" route
spotifyRouter.get('/', getMySpotifyDetails);

export default spotifyRouter;





