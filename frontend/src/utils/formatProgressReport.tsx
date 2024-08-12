import { Pupil } from "../interface/Interfaces";

const stages = [
  "Introduced",
  "Talk Through",
  "Prompted",
  "Rarely Prompted",
  "Independent",
];

// Helper function to get progress percentage based on the stage
const getProgressPercentage = (stage: string) => {
  const stageIndex = stages.indexOf(stage);
  if (stageIndex === -1) return 0;
  return (stageIndex / (stages.length - 1)) * 100;
};

// Helper function to get color based on the stage
const getProgressColor = (stage: string) => {
  switch (stage) {
    case "Introduced":
      return "#3d3d3d";
    case "Talk Through":
      return "#213260";
    case "Prompted":
      return "#3d4f83";
    case "Rarely Prompted":
      return "#6474a5";
    case "Independent":
      return "#95a5d0";
    default:
      return "#D3D3D3";
  }
};

// Formats a pupil's progress report into an HTML string suitable for email.
const formatProgressReport = ({
  firstName,
  lastName,
  noviceSkillsList,
  intermediateSkillsList,
  advancedSkillsList,
}: Pupil): string => {
  // Helper function to generate HTML for skill lists with progress bars
  const generateSkillListHtml = (
    skillsList: { variable: string; stage: string }[]
  ) =>
    skillsList
      .map((record) => {
        const progressPercentage = getProgressPercentage(record.stage);
        const progressColor = getProgressColor(record.stage);
        return `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <div>
                  <strong>${record.variable}</strong><br>
                  <div style="background: #eee; border-radius: 4px; overflow: hidden; height: 10px; margin-bottom: 5px;">
                    <div style="width: ${progressPercentage}%; background-color: ${progressColor}; height: 100%; border-radius: 4px;"></div>
                  </div>
                  <span style="color: #666; font-size: 14px;">${record.stage}</span>
                </div>
              </td>
            </tr>
          `;
      })
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
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .logo {
            display: block;
            margin: 0 auto 20px;
            width: 150px; /* Adjust size as needed */
          }
          h1 {
            color: #213260;
            font-size: 26px;
            border-bottom: 2px solid #213260;
            padding-bottom: 10px;
            margin-bottom: 20px;
            text-align: center;
          }
          .skill-category {
            margin-bottom: 20px;
          }
          .skill-category > div {
            margin-bottom: 20px;
          }
          h2 {
            color: #213260;
            font-size: 22px;
            margin-bottom: 15px;
          }
          .skill {
            margin-bottom: 15px;
          }
          .variable {
            font-weight: bold;
            color: #213260;
            display: block;
            margin-bottom: 5px;
          }
          .progress-bar {
            background: #eee;
            border-radius: 4px;
            overflow: hidden;
            height: 10px;
            margin-bottom: 5px;
          }
          .progress {
            height: 100%;
            border-radius: 4px;
          }
          .stage {
            color: #666;
            font-size: 14px;
          }
          ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          li {
            padding: 10px;
            background: #ffffff;
            border-left: 4px solid #213260;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img class="logo" src="https://chelseadrivingschool.co.uk/wp-content/uploads/2019/04/chelsea-driving-school-240.jpg" alt="Driving School Logo" />
          <h1>${firstName} ${lastName}'s Progress Report</h1>
          <div class="skill-category">
            <div>
              <h2>Novice Skills</h2>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${generateSkillListHtml(noviceSkillsList)}
              </table>
            </div>
            <div>
              <h2>Intermediate Skills</h2>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${generateSkillListHtml(intermediateSkillsList)}
              </table>
            </div>
            <div>
              <h2>Advanced Skills</h2>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${generateSkillListHtml(advancedSkillsList)}
              </table>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default formatProgressReport;
