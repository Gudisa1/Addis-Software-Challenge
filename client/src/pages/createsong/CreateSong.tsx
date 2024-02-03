import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "@emotion/styled";
import {
  PageContainer,
  Header,
  CreateSongContainer,
  FormLabel,
  FormInput,
  SubmitButton,
  GoBackHomeButton,
  ErrorMessage,
} from "./createSongStyles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSong } from "../../redux/features/song/songSlice";
import { createSong } from "../../helpers/api";

interface Song {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

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
    <PageContainer>
      <CreateSongContainer>
        <Header>Create a New Song</Header>

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
    </PageContainer>
  );
};

export default CreateSong;
