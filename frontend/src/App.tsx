import { Route, Routes, Navigate } from "react-router-dom";
import ReportCardPage from "./pages/ReportCardPage";
import PupilListPage from "./pages/PupilListPage";
import ProgressReportPage from "./pages/ProgressReportPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <PupilListPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/card"
          element={user ? <ReportCardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/card/:id"
          element={user ? <ReportCardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route path="/test" element={<ProgressReportPage />} />
      </Routes>
    </>
  );
}

export default App;
