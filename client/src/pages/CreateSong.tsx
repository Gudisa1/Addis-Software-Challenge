import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useDispatch } from "react-redux";
import { addSong } from "../redux/features/song/songSlice";
import { useNavigate } from "react-router-dom";
import { createSong } from "../helpers/api";
const CreateSongContainer = styled.div`
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

const GoBackHomeButton = styled(Link)`
  background-color: #2196f3;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
`;

const CreateSong = () => {
  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSong({
      ...song,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdSong = await createSong(song);
      setSong({
        title: "",
        artist: "",
        album: "",
        genre: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating song:", error);
      
    }
  };

  return (
    <CreateSongContainer>
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

        <SubmitButton type="submit">Create Song</SubmitButton>
        <Link to="/">
          <p>Go Back Home</p>
        </Link>
      </form>
    </CreateSongContainer>
  );
};

export default CreateSong;
