import axios from "axios";

const API_ENDPOINT = "http://localhost:5000/api/";

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}songs`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const deleteSongById = async (songId) => {
  try {
    const response = await axios.delete(`${API_ENDPOINT}songs/${songId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting song:", error);
    throw error;
  }
};
export const updateSongById = async (songId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_ENDPOINT}songs/${songId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating song:", error);
    throw error;
  }
};
export const createSong = async (songData) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}songs`, songData);
    return response.data;
  } catch (error) {
    console.error("Error creating song:", error);
    throw error;
  }
};

export const fetchStatistics = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};
