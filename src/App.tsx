import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Pages from "./pages/Pages";
import PricePlans from "./pages/PricePlans";
import Products from "./pages/Products";
import NavBar from "./components/NavBar";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/price-plans" element={<PricePlans />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
