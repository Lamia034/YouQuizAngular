import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AnswerComponent } from './answers/answer.component';
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "./navbar/navbar.component";
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LevelComponent } from './levels/level.component';
import { SubjectComponent } from './subjects/subject.component';
import { QuestionComponent } from './questions/question.component';
import {MediaComponent} from "./medias/media.component";
import { QuizComponent } from './quizs/quiz.component';
import {QuizdetailComponent} from './quizdetails/quizdetail.component';
// import { MediaComponent } from './medias/media.component';
@NgModule({
  declarations: [
    AppComponent,
    AnswerComponent,
    NavbarComponent,
    LevelComponent,
    SubjectComponent,
    QuestionComponent,
    MediaComponent,
    QuizComponent,
    QuizdetailComponent
  ],
    imports: [
        BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule
     //    RouterOutlet,
     //    HttpClientModule,
     //    RouterLink,
     //  AppRoutingModule,
     // RouterModule.forRoot([])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
