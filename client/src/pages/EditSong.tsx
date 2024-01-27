import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSongById } from "../helpers/api";
import { updateSong } from "../redux/features/song/songSlice";
const EditSongContainer = styled.div`
  max-width: 400px;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
`;

const GoToHomeButton = styled(Link)`
  background-color: #2196f3;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
`;

const EditSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const handleInputChange = (e) => {
    setSong({
      ...song,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateSongById(id, song);
      dispatch(updateSong({ id: parseInt(id), updatedSong: song }));
      alert("Song updated successfully!");

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log("Error updating song:", error);
    }
  };
  return (
    <EditSongContainer>
      <form onSubmit={handleSubmit}>
        <FormLabel>Title</FormLabel>
        <FormInput
          type="text"
          name="title"
          value={song.title}
          onChange={handleInputChange}
        />

        <FormLabel>Artist</FormLabel>
        <FormInput
          type="text"
          name="artist"
          value={song.artist}
          onChange={handleInputChange}
        />

        <FormLabel>Album</FormLabel>
        <FormInput
          type="text"
          name="album"
          value={song.album}
          onChange={handleInputChange}
        />

        <FormLabel>Genre</FormLabel>
        <FormInput
          type="text"
          name="genre"
          value={song.genre}
          onChange={handleInputChange}
        />

        <SubmitButton type="submit">Save Changes</SubmitButton>
        <GoToHomeButton to="/">Go to Home</GoToHomeButton>
      </form>
    </EditSongContainer>
  );
};

export default EditSong;
