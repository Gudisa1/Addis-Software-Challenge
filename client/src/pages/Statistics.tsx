import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { FaMusic, FaUser, FaCompactDisc, FaGuitar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStatistics,
  setStatistics,
} from "../redux/features/song/songSlice";
import { fetchStatistics } from "../helpers/api";

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const StatCard = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #666;
`;

const Statistics = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await fetchStatistics();
        console.log("Statistics:", stats);

        dispatch(setStatistics(stats));
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  if (!statistics) {
    // You might want to render a loading indicator here while statistics are being fetched
    return <div>Loading...</div>;
  }
  const data = {
    totalSongs: 5,
    totalArtists: 3,
    totalAlbums: 4,
    totalGenres: 2,
    genreCounts: {
      Anchihoye: 4,
      Bati: 1,
    },
    artistStats: {
      "Tewdrose Tadesse": {
        songCount: 1,
        albumCount: {},
      },
      "Haileyesus Tesfaye": {
        songCount: 1,
        albumCount: {},
      },
      "Abel Tesfaye": {
        songCount: 3,
        albumCount: {},
      },
    },
    songsInAlbums: {
      Zimta: ["Zimta"],
      "Ke Komshebet Bota": ["Ke Komshebet Bota"],
      "Daft Punk": ["False Alarm", "Blinding Lights"],
      "After Hours": ["Save your Tears"],
    },
  };

  return (
    <Container>
      <Header>General Statistics</Header>
      <StatsContainer>
        <StatCard>
          <StatIcon>
            <FaMusic />
          </StatIcon>
          <StatValue>{statistics.totalSongs}</StatValue>
          <StatLabel>Total Songs</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon>
            <FaUser />
          </StatIcon>
          <StatValue>{statistics.totalArtists}</StatValue>
          <StatLabel>Total Artists</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon>
            <FaCompactDisc />
          </StatIcon>
          <StatValue>{statistics.totalAlbums}</StatValue>
          <StatLabel>Total Albums</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon>
            <FaGuitar />
          </StatIcon>
          <StatValue>{statistics.totalGenres}</StatValue>
          <StatLabel>Total Genres</StatLabel>
        </StatCard>

        {Object.entries(statistics.genreCounts).map(([genre, count]) => (
          <StatCard key={genre}>
            <StatIcon>
              <FaGuitar />
            </StatIcon>
            <StatValue>{count}</StatValue>
            <StatLabel>{genre} Songs</StatLabel>
          </StatCard>
        ))}

        {Object.entries(statistics.artistStats).map(([artist, stats]) => (
          <StatCard key={artist}>
            <StatIcon>
              <FaUser />
            </StatIcon>
            <StatValue>{stats.songCount}</StatValue>
            <StatLabel>{artist} Songs</StatLabel>
          </StatCard>
        ))}

        {Object.entries(statistics.songsInAlbums).map(([album, songs]) => (
          <StatCard key={album}>
            <StatIcon>
              <FaCompactDisc />
            </StatIcon>
            <StatValue>{songs.length}</StatValue>
            <StatLabel>{album} Songs</StatLabel>
          </StatCard>
        ))}
      </StatsContainer>
    </Container>
  );
};

export default Statistics;
