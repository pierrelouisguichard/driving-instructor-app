import { DrivingSkillInterface } from "../interface/Interfaces";
import {
  advancedSkills,
  intermediateSkills,
  noviceSkills,
  stages,
} from "../constants/skillsConstants";

export const noviceSkillsList: DrivingSkillInterface[] = noviceSkills.map(
  (variable) => ({
    variable,
    stage: stages[0], // Default to the first stage, "Introduced"
  })
);

export const intermediateSkillsList: DrivingSkillInterface[] =
  intermediateSkills.map((variable) => ({
    variable,
    stage: stages[0],
  }));

export const advancedSkillsList: DrivingSkillInterface[] = advancedSkills.map(
  (variable) => ({
    variable,
    stage: stages[0],
  })
);
