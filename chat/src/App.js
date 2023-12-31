import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./components/join/join";
import Chat from "./components/chat/chat";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Join /> } />
        <Route path="/chat" element={ <Chat /> } />
      </Routes>
    </Router>
  );
}

export default App;
