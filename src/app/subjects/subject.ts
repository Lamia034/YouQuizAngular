export interface Subject{
  subject_id:number;
  title:string;
  parent:Subject | null;
}
