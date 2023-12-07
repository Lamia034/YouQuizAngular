import {Subject} from "../subjects/subject";
import {Level} from "../levels/level";
export enum QuestionType {
  Multi = 'MULTI',
  Boolean = 'BOOLEAN'
}
export interface Question {
  question_id: number;
  text: string;
  level: Level;
  subject: Subject;
  question_type:QuestionType;
}
