import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NoticesPage from "./pages/NoticesPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notices" element={<NoticesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
