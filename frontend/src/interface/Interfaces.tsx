export interface PupilInterface {
  _id: string;
  firstName: string;
  lastName: string;
  eMail: string;
  noviceSkillsList: DrivingSkillInterface[];
}

export interface DrivingSkillInterface {
  variable: string;
  stage: string;
}
