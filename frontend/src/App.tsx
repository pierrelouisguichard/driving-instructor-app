import { Route, Routes, Navigate } from "react-router-dom";
import ReportCardPage from "./pages/ReportCardPage";
import PupilListPage from "./pages/PupilListPage";
import { useAuthContext } from "./hooks/useAuthContext";
import ProgressReportPage from "./pages/ProgressReportPage";
import AuthPage from "./pages/AuthPage";
import PageNotFound from "./components/PageNotFound";

function App() {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
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
        element={!user ? <AuthPage mode="login" /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!user ? <AuthPage mode="signup" /> : <Navigate to="/" />}
      />
      <Route path="/report" element={<ProgressReportPage />} />
    </Routes>
  );
}

export default App;
