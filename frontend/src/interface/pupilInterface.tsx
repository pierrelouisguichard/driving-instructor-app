import { DrivingSkillInterface } from "./DrivingSkillInterface";

interface PupilInterface {
  _id: string;
  firstName: string;
  lastName: string;
  eMail: string;
  createdAt: string;
  drivingSkillsList: DrivingSkillInterface[]; // Adjust the type if it's different
}

export default PupilInterface;
