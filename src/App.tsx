import { Route, Routes } from "react-router-dom";
import Card from "./pages/Card";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </>
  );
}

export default App;
