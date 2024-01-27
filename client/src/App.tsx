import { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import EditSong from "./pages/EditSong";
import CreateSong from "./pages/CreateSong";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stat" element={<Statistics />} />
        <Route path="/edit/:id" element={<EditSong />} />
        <Route path="/create" element={<CreateSong />} />
      </Routes>
    </>
  );
}

export default App;
