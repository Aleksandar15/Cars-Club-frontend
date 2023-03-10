import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/Home/HomePage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
