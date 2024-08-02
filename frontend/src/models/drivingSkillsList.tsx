// Importing constants and interfaces
import {
  advancedSkills,
  intermediateSkills,
  noviceSkills,
  stages,
} from "../constants/skillsConstants";
import { DrivingSkill } from "../interface/Interfaces";

// Helper function to generate a default skills list with the initial stage set to "Introduced"
const generateDefaultSkillsList = (skills: string[]): DrivingSkill[] =>
  skills.map((variable) => ({
    variable,
    stage: stages[0], // Default to the first stage, "Introduced"
  }));

// Generate default lists of driving skills (novice, intermediate, and advanced) using the helper function
export const defaultNoviceSkillsList: DrivingSkill[] =
  generateDefaultSkillsList(noviceSkills);
export const defaultIntermediateSkillsList: DrivingSkill[] =
  generateDefaultSkillsList(intermediateSkills);
export const defaultAdvancedSkillsList: DrivingSkill[] =
  generateDefaultSkillsList(advancedSkills);
