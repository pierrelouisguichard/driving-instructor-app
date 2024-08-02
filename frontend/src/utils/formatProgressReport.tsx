import { Pupil } from "../interface/Interfaces";

// Formats a pupil's progress report into an HTML string suitable for email.
const formatProgressReport = ({
  firstName,
  lastName,
  noviceSkillsList,
  intermediateSkillsList,
  advancedSkillsList,
}: Pupil): string => {
  // Helper function to generate HTML for skill lists
  const generateSkillListHtml = (
    skillsList: { variable: string; stage: string }[]
  ) =>
    skillsList
      .map(
        (record, index) => `
          <li key="${index}">
            <span class="variable">${record.variable}</span>: 
            <span class="stage">${record.stage}</span>
          </li>
        `
      )
      .join("");

  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            width: 90%;
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #333;
            font-size: 24px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .skill-category {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 20px;
          }
          .skill-category > div {
            flex: 1;
            padding: 10px;
            background: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 0 5px rgba(0,0,0,0.1);
          }
          h2 {
            color: #555;
            font-size: 20px;
            margin-bottom: 15px;
          }
          .variable {
            font-weight: bold;
            color: #333;
          }
          .stage {
            color: #666;
          }
          ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          li {
            margin-bottom: 10px;
            padding: 10px;
            background: #ffffff;
            border-left: 4px solid #007bff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${firstName} ${lastName}'s Progress Report</h1>
          <div class="skill-category">
            <div>
              <h2>Novice Skills</h2>
              <ul>
                ${generateSkillListHtml(noviceSkillsList)}
              </ul>
            </div>
            <div>
              <h2>Intermediate Skills</h2>
              <ul>
                ${generateSkillListHtml(intermediateSkillsList)}
              </ul>
            </div>
            <div>
              <h2>Advanced Skills</h2>
              <ul>
                ${generateSkillListHtml(advancedSkillsList)}
              </ul>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default formatProgressReport;
