import React from "react";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import Navbar from "./components/navbar/Navbar";
import CountryApi from "./components/apis/countryApi/CountryApi";
import GithubApi from "./components/apis/githubApi/GithubApi";
import IndiDisplay from "./components/display/IndiDisplay";

function App() {
  return(
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/people" element={<GithubApi/>}/>
          <Route path="/country" element={<CountryApi/>}/>
          <Route path="/result" element={<IndiDisplay/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
