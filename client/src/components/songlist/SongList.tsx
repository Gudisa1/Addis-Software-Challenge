import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  selectSongs,
  setSongs,
  deleteSong,
} from "../../redux/features/song/songSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Header,
  SongGrid,
  SongContainer,
  SongInfo,
  SongTitle,
  SongDetails,
  ActionButtons,
  DeleteButton,
  UpdateButton,
  SearchForm,
  SearchInput,
  SearchButton,
  GenreSelect,
  GenreLabel,
} from "./SongListStyles";
import {
  fetchData,
  deleteSongById,
  searchSongs,
  fetchGenres,
} from "../../helpers/api";

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector(selectSongs);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const [songs, genre] = await Promise.all([fetchData(), fetchGenres()]);
        const genredata = genre.data;
        setGenres(genredata as string[]); // Assuming genredata is an array of strings
        dispatch(setSongs(songs as any));
      } catch (error) {
        console.log("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [dispatch, searchTerm]);

  const handleDelete = async (songId: string) => {
    try {
      const response = await deleteSongById(songId);
      dispatch(deleteSong(songId));
      setSuccess("Song deleted successfully");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (error) {
      setError("Error deleting song");
      setTimeout(() => {
        setError("");
      });
    }
  };

  const handleSearch = async () => {
    try {
      const { data: searchedSongs } = await searchSongs(searchTerm);
      console.log(searchedSongs);
      dispatch(setSongs(searchedSongs));
      setError(null);
    } catch (error: any) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <Container>
      <Header>Song List</Header>
      <SearchForm>
        <SearchInput
          type="text"
          placeholder="Search by title, artist, or album"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="button" onClick={handleSearch}>
          Search
        </SearchButton>
        <GenreLabel>Genre:</GenreLabel>
        <GenreSelect onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          {genres?.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </GenreSelect>
      </SearchForm>
      {success && <h4 style={{ color: "green" }}>{success}</h4>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <SongGrid>
        {Array.isArray(songs) &&
          songs
            .filter(
              (song) =>
                song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                song.album.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((song) =>
              selectedGenre ? song.genre === selectedGenre : true
            )
            .map((song) => (
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
