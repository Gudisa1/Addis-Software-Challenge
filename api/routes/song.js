import express from "express";
import {
  createSong,
  listSongs,
  updateSong,
  removeSong,
  getSingleSong,
  getGeneralStats,
  searchSongs,
  filterSongsByGenre,
} from "../controllers/song.js";

const router = express.Router();

router.route("/songs").post(createSong).get(listSongs);
router.route("/songs/search/:query").get(searchSongs);
router.route("/songs/filter/:genre").get(filterSongsByGenre);
router
  .route("/songs/:id")
  .put(updateSong)
  .delete(removeSong)
  .get(getSingleSong);

router.route("/stats").get(getGeneralStats);

export default router;
