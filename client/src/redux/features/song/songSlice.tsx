import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  id: number;
  // Add other properties of your song here
}

interface SongState {
  songs: Song[];
  statistics: null | any; // Update `any` to the type of your statistics
}

const initialState: SongState = {
  songs: [],
  statistics: null,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    deleteSong: (state, action: PayloadAction<number>) => {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
    updateSong: (
      state,
      action: PayloadAction<{ id: number; updatedSong: Song }>
    ) => {
      const { id, updatedSong } = action.payload;
      const index = state.songs.findIndex((song) => song.id === id);
      if (index !== -1) {
        state.songs[index] = updatedSong;
      }
    },
    setStatistics: (state, action: PayloadAction<any>) => {
      state.statistics = action.payload;
    },
  },
});

export const { setSongs, addSong, deleteSong, updateSong, setStatistics } =
  songSlice.actions;

export const selectSongs = (state: { song: SongState }) => state.song.songs;
export const selectStatistics = (state: { song: SongState }) =>
  state.song.statistics;

export default songSlice.reducer;
