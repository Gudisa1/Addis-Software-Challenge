import Song from "../models/Song.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";
export const createSong = async (req, res, next) => {
  try {
    const { title, artist, album, genre } = req.body;
    if (!title || !artist || !album || !genre) {
      return res.status(400).json({
        success: false,
        error:
          "Please provide values for 'title', 'artist', 'album', and 'genre'.",
      });
    }
    const existingSong = await Song.findOne({ title, artist });
    if (existingSong) {
      return res.status(400).json({
        success: false,
        error: "A song with the same title and artist already exists.",
      });
    }

    // Create a new song
    const newSong = await Song.create(req.body);

    res.status(201).json({
      success: true,
      data: newSong,
      message: "Song created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleSong = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.status(200).json({
      success: true,
      data: song,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const listSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const updateSong = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid song ID" });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty" });
    }

    const updatedSong = await Song.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSong) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedSong,
    });
  } catch (error) {
    next(error);
  }
};

export const removeSong = async (req, res, next) => {
  const { id } = req.params;
  try {
    const removedSong = await Song.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: removedSong,
      message: "Song removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getGeneralStats = async (req, res) => {
  try {
    const allSongs = await Song.find();

    const uniqueArtists = [...new Set(allSongs.map((song) => song.artist))];
    const uniqueAlbums = [...new Set(allSongs.map((song) => song.album))];
    const uniqueGenres = [...new Set(allSongs.map((song) => song.genre))];

    const totalSongs = allSongs.length;
    const totalArtists = uniqueArtists.length;
    const totalAlbums = uniqueAlbums.length;
    const totalGenres = uniqueGenres.length;

    const genreCounts = {};
    allSongs.forEach((song) => {
      genreCounts[song.genre] = (genreCounts[song.genre] || 0) + 1;
    });

    const artistStats = {};
    allSongs.forEach((song) => {
      artistStats[song.artist] = artistStats[song.artist] || {
        songCount: 0,
        albumCount: new Set(),
      };
      artistStats[song.artist].songCount += 1;
      artistStats[song.artist].albumCount.add(song.album);
    });

    const songsInAlbums = {};
    allSongs.forEach((song) => {
      songsInAlbums[song.album] = songsInAlbums[song.album] || [];
      songsInAlbums[song.album].push(song.title);
    });

    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genreCounts,
      artistStats,
      songsInAlbums,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
