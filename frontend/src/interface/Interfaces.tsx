export interface Pupil {
  firstName: string;
  lastName: string;
  eMail: string;
  noviceSkillsList: DrivingSkill[];
  intermediateSkillsList: DrivingSkill[];
  advancedSkillsList: DrivingSkill[];
}

export interface PupilWithID extends Pupil {
  _id: string;
}

export interface DrivingSkill {
  variable: string;
  stage: string;
}

export interface DrivingSkillWithMethod extends DrivingSkill {
  onStageChange: (stage: string) => void;
}

export interface User {
  email: string;
  token: string;
  isAdmin: boolean;
}
