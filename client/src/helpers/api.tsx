import axios, { AxiosResponse } from "axios";

const API_ENDPOINT = "http://localhost:5000/api/";

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  genreCounts: Record<string, number>;
  artistStats: Record<
    string,
    { songCount: number; albumCount: Record<string, number> }
  >;
  songsInAlbums: Record<string, string[]>;
}

export const fetchData = async (): Promise<Song[]> => {
  try {
    const response: AxiosResponse<{ data: Song[] }> = await axios.get(
      `${API_ENDPOINT}songs`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteSongById = async (songId: string): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.delete(
      `${API_ENDPOINT}songs/${songId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting song:", error);
    throw error;
  }
};

export const updateSongById = async (
  songId: string,
  updatedData: Partial<Song>
): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.put(
      `${API_ENDPOINT}songs/${songId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating song:", error);
    throw error;
  }
};

export const createSong = async (
  songData: Omit<Song, "_id">
): Promise<Song> => {
  try {
    const response: AxiosResponse<{ data: Song }> = await axios.post(
      `${API_ENDPOINT}songs`,
      songData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating song:", error);
    throw error;
  }
};

export const fetchStatistics = async (): Promise<Statistics> => {
  try {
    const response: AxiosResponse<Statistics> = await axios.get(
      `${API_ENDPOINT}stats`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};
