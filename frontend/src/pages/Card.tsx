import "./Card.css";
import Logo from "../assets/Driving_School.png";
import AddPupil from "../components/addPupil";
import { useParams } from "react-router-dom";

const Card: React.FC = () => {
  const { pupilId } = useParams<{ pupilId: string }>();

  return (
    <div id="root">
      <img src={Logo} className="logo" alt="Driving School Logo" />
      <div className="progress-container">
        <AddPupil />
      </div>
    </div>
  );
};

export default Card;
