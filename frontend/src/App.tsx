import { Route, Routes, Navigate } from "react-router-dom";
import ReportCardPage from "./pages/ReportCardPage";
import PupilListPage from "./pages/PupilListPage";
import { useAuthContext } from "./hooks/useAuthContext";
import ProgressReportPage from "./pages/ProgressReportPage";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
      {user && !user.isAdmin && (
        <>
          <Route path="/" element={<PupilListPage />} />
          <Route path="/card" element={<ReportCardPage />} />
          <Route path="/card/:id" element={<ReportCardPage />} />
          <Route path="/report" element={<ProgressReportPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}

      {user && user.isAdmin && (
        <>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
