import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSongById, getSongById } from "../../helpers/api";
import { updateSong } from "../../redux/features/song/songSlice";
import {
  PageContainer,
  EditSongContainer,
  FormLabel,
  FormInput,
  SubmitButton,
  GoToHomeButton,
  ErrorMessage,
  Header,
} from "./editSongsStyles";
interface Song {
  title: string;
  artist: string;
  album: string;
  genre: string;
}
interface Props {
  id: string;
}

const EditSong: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("id:", id);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [song, setSong] = useState<Song>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const fetchedSong = await getSongById(id);
        console.log("fetchedSong:", fetchedSong);
        setSong(fetchedSong.data);
      } catch (error) {
        console.error("Error fetching song:", error);
        setError("Error fetching song. Please try again.");
      }
    };

    fetchSong();
  }, [id]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSong({
      ...song,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateSongById(id, song);
      dispatch(updateSong({ id: parseInt(id), updatedSong: song }));
      alert("Song updated successfully!");

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error updating song:", error);
      setError("Error updating song. Please try again.");
    }
  };

  return (
    <PageContainer>
      <EditSongContainer>
        <Header>EditSong Song</Header>

        <form onSubmit={handleSubmit}>
          <FormLabel>Title</FormLabel>
          <FormInput
            type="text"
            name="title"
            placeholder={song.title}
            value={song.title}
            onChange={handleInputChange}
          />

          <FormLabel>Artist</FormLabel>
          <FormInput
            type="text"
            name="artist"
            placeholder={song.artist}
            value={song.artist}
            onChange={handleInputChange}
          />

          <FormLabel>Album</FormLabel>
          <FormInput
            type="text"
            name="album"
            placeholder={song.album}
            value={song.album}
            onChange={handleInputChange}
          />

          <FormLabel>Genre</FormLabel>
          <FormInput
            type="text"
            name="genre"
            placeholder={song.genre}
            value={song.genre}
            onChange={handleInputChange}
          />

          <SubmitButton type="submit">Save Changes</SubmitButton>
          <GoToHomeButton to="/">Go to Home</GoToHomeButton>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      </EditSongContainer>
    </PageContainer>
  );
};

export default EditSong;
