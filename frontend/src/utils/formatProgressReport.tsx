import { PupilInterface } from "../interface/Interfaces";

const formatProgressReport = ({
  firstName,
  lastName,
  noviceSkillsList,
}: PupilInterface): string => {
  return `
    <html>
      <head>
        <style>
          .container {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
          h2 {
            color: #555;
          }
          .variable {
            font-weight: bold;
          }
          .stage {
            color: #666;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            margin-bottom: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${firstName} ${lastName}'s Progress Report</h1>
          <h2>Progress Record</h2>
          <ul>
            ${noviceSkillsList
              .map(
                (record, index) => `
              <li key="${index}">
                <span class="variable">${record.variable}</span>: 
                <span class="stage">${record.stage}</span>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      </body>
    </html>
  `;
};

export default formatProgressReport;
