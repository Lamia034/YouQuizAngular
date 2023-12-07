
import { Question } from '../questions/question';
export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Sound = 'SOUND'
}

export interface Media {
  media_id: number;
  title: string;
  media_type: MediaType;
  question: Question;
}
