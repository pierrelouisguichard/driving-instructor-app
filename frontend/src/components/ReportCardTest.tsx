import formatProgressReport from "../utils/formatProgressReport";
import { noviceSkillsList } from "../models/drivingSkillsList";

function ReportCardTest() {
  const firstName: string = "John";
  const lastName: string = "Doe";

  return (
    <div>
      {formatProgressReport({
        firstName,
        lastName,
        noviceSkillsList: noviceSkillsList,
        _id: "",
        eMail: "",
      })}
    </div>
  );
}

export default ReportCardTest;
