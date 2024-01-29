import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSong } from "../redux/features/song/songSlice";
import { createSong } from "../helpers/api";

interface Song {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

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

const ErrorMessage = styled.p`
  color: #ff5c5c;
  margin-top: 8px;
`;

const CreateSong: React.FC = () => {
  const [song, setSong] = useState<Song>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSong({
      ...song,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createdSong = await createSong(song);
      setSong({
        title: "",
        artist: "",
        album: "",
        genre: "",
      });
      setError(null);
      navigate("/");
    } catch (error) {
      console.error("Error creating song:", error);
      setError("Error creating song. Please try again.");
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
        <GoBackHomeButton to="/">Go Back Home</GoBackHomeButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </CreateSongContainer>
  );
};

export default CreateSong;
