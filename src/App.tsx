import { useState } from "react";
import { Container } from "react-bootstrap";
// import reactLogo from './assets/react.svg'
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import NavBar from "./components/NavBar/NavBar";
import Marketplace from "./components/Marketplace/Marketplace";

function App() {
  return (
    <div>
      <NavBar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Protected routes */}
          <Route path="/marketplace" element={<Marketplace />} />

          {/* Not found route */}
          <Route
            path="*"
            element={<h1 className="text-danger">NOT FOUND</h1>}
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
