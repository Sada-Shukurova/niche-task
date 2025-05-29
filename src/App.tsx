import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import NoticesPage from "./pages/NoticesPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import { AnimatePresence } from "motion/react";

function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" element={<HomePage />} />
          <Route path="/notices" element={<NoticesPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
