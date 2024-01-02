import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AnswerComponent} from "./answers/answer.component";
import {LevelComponent} from "./levels/level.component";
import {SubjectComponent} from "./subjects/subject.component";
import {QuestionComponent} from "./questions/question.component";
import {MediaComponent} from "./medias/media.component";
import {QuizComponent} from "./quizs/quiz.component";
import {QuizdetailComponent} from "./quizdetails/quizdetail.component";

const routes: Routes = [
  // {path: '', component: AppComponent},
  {path:'answers' , component:AnswerComponent},
    { path: 'answers/:answerId', component: AnswerComponent },
  {path:'levels' , component:LevelComponent},
  { path: 'levels/:levelId', component: LevelComponent },
  {path:'subjects' , component:SubjectComponent},
  { path: 'subjects/:subjectId', component: SubjectComponent },
  {path:'questions' , component:QuestionComponent},
  { path: 'questions/:questionId', component: QuestionComponent },
  {path:'medias' , component:MediaComponent},
  { path: 'medias/:mediaId', component: MediaComponent },
  {path:'quizs' , component:QuizComponent},
  { path: 'quizdetails/:quizId', component: QuizdetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
