import "./Card.css";
import Logo from "../assets/Driving_School.png";
import Row from "../components/Row";

function Card() {
  return (
    <div id="root">
      <img src={Logo} className="logo" alt="Driving School Logo" />
      <div className="progress-container">
        <h2>Progress Record</h2>
        <Row variable={"Cockpit Drill & Controls"} />
        <Row variable={"Moving Off Safely"} />
        <Row variable={"Steer Accurate Course"} />
        <Row variable={"Stop Normally"} />
        <Row variable={"Gear Changing"} />
        <Row variable={"Clutch Control (level & uphill)"} />
        <Row variable={"Approaching & Turning Left"} />
        <Row variable={"Approaching & Emerging Left"} />
        <Row variable={"Approaching & Turning Right"} />
        <Row variable={"Approaching & Emerging Left"} />
        <Row variable={"Crossing Path"} />
        <Row variable={"Moving off at an angle"} />
        <Row variable={"Hill Starts (up & down)"} />
        <Row variable={"Controlled Stop"} />
        <Row variable={"Cross Roads"} />
        <Row variable={"Ancillary Controls"} />
      </div>
    </div>
  );
}

export default Card;
