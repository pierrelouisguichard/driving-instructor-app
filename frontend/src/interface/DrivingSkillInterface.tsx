export interface DrivingSkillInterface {
  variable: string;
  stage: string;
  onStageChange?: (stage: string) => void; // Optional property
}
