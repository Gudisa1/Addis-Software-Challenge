import styled from "@emotion/styled";
import { FiTrash2, FiEdit } from "react-icons/fi";

export const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const SongGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export const SongContainer = styled.div`
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

export const SongInfo = styled.div`
  flex-grow: 1;
`;

export const SongTitle = styled.h3`
  margin: 0;
  color: #333;
`;

export const SongDetails = styled.p`
  margin: 5px 0;
  color: #666;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const DeleteButton = styled(FiTrash2)`
  color: #ff5c5c;
  cursor: pointer;
`;

export const UpdateButton = styled(FiEdit)`
  color: #4caf50;
  cursor: pointer;
`;

export const SearchForm = styled.form`
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 40%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
export const SearchButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;
export const GenreSelect = styled.select`
  width: 30%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
`;
export const GenreLabel = styled.label`
  color: #333;
  font-size: 26px;
  margin-left: 20px;
`;
