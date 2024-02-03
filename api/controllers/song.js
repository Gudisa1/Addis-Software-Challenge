import Song from "../models/Song.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";
export const createSong = async (req, res, next) => {
  try {
    const { title, artist, album, genre } = req.body;
    if (!title || !artist || !album || !genre) {
      return next(
        errorHandler(
          res,
          400,
          "Please provide values for title, artist, album, and genre."
        )
      );
    }
    const existingSong = await Song.findOne({ title, artist });
    if (
      existingSong &&
      existingSong.title === title &&
      existingSong.artist === artist
    ) {
      return next(
        errorHandler(
          res,
          400,
          "A song with the same title and artist already exists."
        )
      );
    }
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

export const getSingleSong = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler(res, 400, "Invalid song ID"));
    }
    const song = await Song.findById(id);
    if (!song) {
      return next(errorHandler(res, 404, "Song not found"));
    }
    res.status(200).json({
      success: true,
      data: song,
    });
  } catch (error) {
    next(error);
  }
};

export const listSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.status(200).json({
      success: true,
      data: songs,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSong = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler(res, 400, "Invalid song ID"));
    }

    if (Object.keys(req.body).length === 0) {
      return next(errorHandler(res, 400, "Request body is empty"));
    }

    const updatedSong = await Song.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSong) {
      return next(errorHandler(res, 404, "Song not found"));
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler(res, 400, "Invalid song ID"));
    }

    const removedSong = await Song.findByIdAndDelete(id);

    if (!removedSong) {
      return next(errorHandler(res, 404, "Song not found"));
    }

    res.status(200).json({
      success: true,
      data: removedSong,
      message: "Song removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getGeneralStats = async (req, res, next) => {
  try {
    const allSongs = await Song.find();

    if (!allSongs) {
      return next(
        errorHandler(res, 404, "No songs Fetched Please Try again later")
      );
    }
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
    next(error);
  }
};
export const searchSongs = async (req, res, next) => {
  try {
    const { query } = req.params;

    if (!query) {
      const allSongs = await Song.find();
      return res.status(200).json({
        success: true,
        data: allSongs,
      });
    }

    const searchResults = await Song.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
        { album: { $regex: query, $options: "i" } },
      ],
    });

    if (searchResults.length === 0) {
      return next(
        errorHandler(res, 404, "No songs found matching the search query")
      );
    }

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.error("Error in searchSongs:", error);
    next(error);
  }
};

export const filterSongsByGenre = async (req, res, next) => {
  const { genre } = req.params;

  try {
    if (!genre) {
      return next(
        errorHandler(res, 404, "Please provide a genre for filtering")
      );
    }

    const filteredSongs = await Song.find({ genre });

    if (filteredSongs.length === 0) {
      return next(
        errorHandler(res, 404, `No Songs Found for the genre: ${genre}`)
      );
    }

    res.status(200).json({
      success: true,
      data: filteredSongs,
    });
  } catch (error) {
    console.error("Error in filterSongsByGenre:", error);
    next(error);
  }
};

export const getUniqueGenres = async (req, res, next) => {
  try {
    const uniqueGenres = await Song.distinct("genre");

    if (!uniqueGenres || uniqueGenres.length === 0) {
      return next(errorHandler(res, 404, "No unique genres found"));
    }

    res.status(200).json({
      success: true,
      data: uniqueGenres,
    });
  } catch (error) {
    console.error("Error in getUniqueGenres:", error);
    next(error);
  }
};
