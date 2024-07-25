import { Route, Routes } from "react-router-dom";
import Card from "./pages/Card";
import Pupil from "./pages/Pupil";
import formatProgressReport from "./components/formatProgressReport";
// import Login from "./pages/Login";

function App() {
  const firstName = "John";
  const lastName = "Doe";
  const progressRecords = [
    { variable: "Cockpit Drill & Controls", stage: "Introduced" },
    { variable: "Moving Off Safely", stage: "Introduced" },
    { variable: "Steer Accurate Course", stage: "Introduced" },
    { variable: "Stop Normally", stage: "Introduced" },
    { variable: "Gear Changing", stage: "Introduced" },
    { variable: "Clutch Control (level & uphill)", stage: "Introduced" },
    { variable: "Approaching & Turning Left", stage: "Introduced" },
    { variable: "Approaching & Emerging Left", stage: "Introduced" },
    { variable: "Approaching & Turning Right", stage: "Introduced" },
    { variable: "Approaching & Emerging Left", stage: "Introduced" },
    { variable: "Crossing Path", stage: "Introduced" },
    { variable: "Moving off at an angle", stage: "Introduced" },
    { variable: "Hill Starts (up & down)", stage: "Introduced" },
    { variable: "Controlled Stop", stage: "Introduced" },
    { variable: "Cross Roads", stage: "Introduced" },
    { variable: "Ancillary Controls", stage: "Introduced" },
  ];
  return (
    <>
      <Routes>
        <Route path="/" element={<Pupil />} />
        <Route path="/card" element={<Card />} />
        <Route path="/card/:id" element={<Card />} />
        <Route
          path="/test"
          element={
            <div>
              {formatProgressReport({ firstName, lastName, progressRecords })}
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
