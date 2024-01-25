import express from "express";
import {
  createSong,
  listSongs,
  updateSong,
  removeSong,
  // getTotalCounts,
  getSingleSong,
  getGeneralStats,
} from "../controllers/song.js";

const router = express.Router();

router.route("/songs").post(createSong).get(listSongs);
router
  .route("/songs/:id")
  .put(updateSong)
  .delete(removeSong)
  .get(getSingleSong);

router.route("/stats").get(getGeneralStats);

export default router;
