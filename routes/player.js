import express from 'express';
import { playAnyFromTop10, playCurruntlyPlayingSong, stopCurruntlyPlayingSong } from '../controllers/player.js';

const playerRouter = express.Router();

playerRouter.get('/stop', stopCurruntlyPlayingSong);
playerRouter.get('/play', playCurruntlyPlayingSong);
playerRouter.get('/play/top', playAnyFromTop10);

export default playerRouter;





