import formatProgressReport from "./components/formatProgressReport";
import { drivingSkillsList } from "./drivingSkillsList";

function ReportCardTest() {
  const firstName: string = "John";
  const lastName: string = "Doe";
  return (
    <div>
      {formatProgressReport({
        firstName,
        lastName,
        drivingSkillsList,
        _id: "",
        eMail: "",
        createdAt: "",
      })}
    </div>
  );
}

export default ReportCardTest;
