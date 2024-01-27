import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  selectSongs,
  setSongs,
  deleteSong,
} from "../redux/features/song/songSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteSongById } from "../helpers/api";
const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const SongGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const SongContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SongInfo = styled.div`
  flex-grow: 1;
`;

const SongTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const SongDetails = styled.p`
  margin: 5px 0;
  color: #666;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled(FiTrash2)`
  color: #ff5c5c;
  cursor: pointer;
`;

const UpdateButton = styled(FiEdit)`
  color: #4caf50;
  cursor: pointer;
`;

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector(selectSongs);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await fetchData();
        dispatch(setSongs(songs));
      } catch (error) {
        console.log("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [dispatch]);

  const handleDelete = async (songId) => {
    try {
      const response = await deleteSongById(songId);
      console.log("Song deleted successfully:", response);

      dispatch(deleteSong(songId));
      const updatedSongs = await fetchData();
      dispatch(setSongs(updatedSongs));
    } catch (error) {
      console.log("Error deleting song:", error);
    }
  };

  return (
    <Container>
      <Header>Song List</Header>
      <SongGrid>
        {songs?.map((song) => (
          <SongContainer key={song._id}>
            <SongInfo>
              <SongTitle>Title: {song.title}</SongTitle>
              <SongDetails>
                Artist: {song.artist},
                <br />
                Album: {song.album},
                <br />
                Genre: {song.genre}
              </SongDetails>
            </SongInfo>
            <ActionButtons>
              <DeleteButton onClick={() => handleDelete(song._id)} />
              <Link to={`/edit/${song._id}`}>
                <UpdateButton />
              </Link>
            </ActionButtons>
          </SongContainer>
        ))}
      </SongGrid>
    </Container>
  );
};

export default SongList;
