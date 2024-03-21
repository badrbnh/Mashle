import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home"; // Assuming your component file is named Home.tsx
import Login from "./pages/login";
import Register from "./pages/signUp";
import Menu from "./pages/FullMenu";
import { SearchProvider } from "./components/SearchContext";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <SearchProvider>
          <header>
            <NavBar
              links={[
                "Home",
                "Our menu",
                "About us",
                "Contact us",
                "Locations",
              ]}
            />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/menu" element={<Menu />} />
            </Routes>
          </main>
          <Footer />
        </SearchProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
