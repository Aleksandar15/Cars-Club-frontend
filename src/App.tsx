import { Container } from "react-bootstrap";
// import reactLogo from './assets/react.svg'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import NavBar from "./components/NavBar/NavBar";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Catalog from "./pages/ProtectedPages/Catalog";
import Marketplace from "./pages/ProtectedPages/Marketplace";
import Login from "./pages/PublicPages/Login";
import Register from "./pages/PublicPages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes/PublicRoutes";
import ScrollToTop from "react-scroll-to-top";

function App() {
  return (
    <div>
      <ScrollToTop
        // topPosition={800}
        color="cyan"
        // size="2rem"
        smooth
        className="scrollToTopComponent"
        style={{ borderRadius: "15px 8px", backgroundColor: "blue" }}
      />
      <NavBar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Public routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/catalog" element={<Catalog />} />
          </Route>

          {/* Not found route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
