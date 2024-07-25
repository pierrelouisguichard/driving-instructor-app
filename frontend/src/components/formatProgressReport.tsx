import "./formatProgressReport.css";

interface ProgressRecord {
  variable: string;
  stage: string;
}

interface Props {
  firstName: string;
  lastName: string;
  progressRecords: ProgressRecord[];
}

const formatProgressReport: React.FC<Props> = ({
  firstName,
  lastName,
  progressRecords,
}) => {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="formatProgressReport.css"
        />
      </head>
      <body>
        <div className="container">
          <h1>
            {firstName} {lastName}'s Progress Report
          </h1>
          <h2>Progress Record</h2>
          <ul>
            {progressRecords.map((record, index) => (
              <li key={index}>
                <span className="variable">{record.variable}</span>:{" "}
                <span className="stage">{record.stage}</span>
              </li>
            ))}
          </ul>
        </div>
      </body>
    </html>
  );
};

export default formatProgressReport;
