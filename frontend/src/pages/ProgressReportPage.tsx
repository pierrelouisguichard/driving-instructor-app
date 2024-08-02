import React, { useState, useEffect } from "react";
import formatProgressReport from "../utils/formatProgressReport";
import {
  defaultAdvancedSkillsList,
  defaultIntermediateSkillsList,
  defaultNoviceSkillsList,
} from "../models/drivingSkillsList";

// This page is for testing and previewing the email report format. (/test)
const ProgressReportPage: React.FC = () => {
  const pupil = {
    firstName: "John",
    lastName: "Doe",
    eMail: "johndoe@gmail.com",
    noviceSkillsList: defaultNoviceSkillsList,
    intermediateSkillsList: defaultIntermediateSkillsList,
    advancedSkillsList: defaultAdvancedSkillsList,
  };

  const [formattedReport, setFormattedReport] = useState<string>("");

  useEffect(() => {
    const report = formatProgressReport(pupil);
    setFormattedReport(report);
  }, [pupil]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: formattedReport }} />
    </div>
  );
};

export default ProgressReportPage;
