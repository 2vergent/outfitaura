import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./utils/protectRoute";
import Login from "./components/login";
import Signup from "./components/signup";
import Homepage from "./components/homepage";
import MenPage from "./components/men";
import WomenPage from "./components/women";
import ProductPage from "./components/productpage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="*" element={<Navigate to="/" />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/men" element={<MenPage />} />
          <Route exact path="/women" element={<WomenPage />} />
          <Route exact path="/product" element={<ProductPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
