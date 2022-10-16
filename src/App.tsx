import React from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/Variables/fonts.css";
//Pages
import Login from "./assets/Pages/Login";
import SignUp from "./assets/Pages/SignUp";
import Games from "./assets/Pages/Games";
import Teams from "./assets/Pages/Teams";
import Players from "./assets/Pages/Players";
import PageNotFound from "./assets/Pages/404";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/games" element={<Games />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
