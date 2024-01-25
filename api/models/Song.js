import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: String, required: true, index: true }, // Add an index on the genre field
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

const Song = mongoose.model("Song", songSchema, "songs"); // Explicitly set lowercase collection name

export default Song;
