import { Route, Routes } from "react-router-dom";
import ReportCardPage from "./pages/ReportCardPage";
import PupilListPage from "./pages/PupilListPage";
import ProgressReportPage from "./pages/ProgressReportPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PupilListPage />} />
        <Route path="/card" element={<ReportCardPage />} />
        <Route path="/card/:id" element={<ReportCardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<ProgressReportPage />} />
      </Routes>
    </>
  );
}

export default App;
