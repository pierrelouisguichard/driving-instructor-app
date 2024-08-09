import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import formatProgressReport from "../utils/formatProgressReport";
import { Pupil } from "../interface/Interfaces";

// This page is to preview the email report format. (/report)
const ProgressReportPage: React.FC = () => {
  const location = useLocation();
  const pupil = location.state?.pupil as Pupil;

  const [formattedReport, setFormattedReport] = useState<string>("");

  useEffect(() => {
    if (pupil) {
      const report = formatProgressReport(pupil);
      setFormattedReport(report);
    }
  }, [pupil]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: formattedReport }} />
    </div>
  );
};

export default ProgressReportPage;
