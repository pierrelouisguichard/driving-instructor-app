import { Route, Routes } from "react-router-dom";
import Card from "./pages/ReportCardPage";
import Pupil from "./pages/PupilListPage";
import ReportCardTest from "./ReportCardTest";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pupil />} />
        <Route path="/card" element={<Card />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reportcardtest" element={<ReportCardTest />} />
      </Routes>
    </>
  );
}

export default App;
