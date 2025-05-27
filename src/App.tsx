import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NoticesPage from "./pages/NoticesPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notices" element={<NoticesPage />} />
      </Routes>
    </>
  );
}

export default App;
