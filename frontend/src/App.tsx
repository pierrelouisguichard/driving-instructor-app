import { Route, Routes } from "react-router-dom";
// import Card from "./pages/Card";
import Pupil from "./pages/Pupil";
// import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pupil />} />
        {/* <Route path="/" element={<Card />} /> */}
        {/* <Route path="/card" element={<Card />} /> */}
      </Routes>
    </>
  );
}

export default App;
