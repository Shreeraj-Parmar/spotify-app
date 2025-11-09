
import { getCurruntPlayingSong, getListOfArtistsYouFollow, getTopTracks } from "../helper/spotify.js";


/**
 * "/spotify" route handler
 * Show a list of artists you follow, top 10 tracks, and currently playing song
 * @param {*} req 
 * @param {*} res 
 */
export const getMySpotifyDetails = async (req, res) => {

    // Get Accesss Token
    const token = req.cookies['spotify_access_token'];

    // Show a list of the artists you follow.
    const followedArtists = await getListOfArtistsYouFollow(token);

    // Format the artist list
    const atrist_list = followedArtists.artists.items.map(artist => {
        return {
            name: artist.name,
            id: artist.id,
            genres: artist.genres,
            popularity: artist.popularity,
            followers: artist.followers.total
        };
    });

    // Show Top 10 Song List
    const topTracksResponse = await getTopTracks(token);


    // Format the top tracks
    const top_tracks = topTracksResponse.items.map((track) => {
        return {
            name: track.name,
            id: track.id,
            album: track.album.name,
            artists: track.artists.map(artist => artist.name).join(", "),
            popularity: track.popularity,
            preview_url: track.preview_url

        }
    });


    // Get Currently Playing Song
    let currunt_playing_song = await getCurruntPlayingSong(token);

    // Format Currently Playing Song
    currunt_playing_song = currunt_playing_song && currunt_playing_song.item ? {
        name: currunt_playing_song.item.name,
        id: currunt_playing_song.item.id,
        album: currunt_playing_song.item.album.name,
        artists: currunt_playing_song.item.artists.map(artist => artist.name).join(", "),
        is_playing: currunt_playing_song.is_playing,
        progress_ms: currunt_playing_song.progress_ms,
        duration_ms: currunt_playing_song.item.duration_ms,
        popularity: currunt_playing_song.item.popularity,
        preview_url: currunt_playing_song.item.preview_url
    } : null;


    // Send the response
    res.status(200).json({
        followedArtists: atrist_list,
        topTracks: top_tracks,
        curruntPlayingSong: currunt_playing_song
    });

}


