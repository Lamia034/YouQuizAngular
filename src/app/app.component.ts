import { Component, OnInit } from '@angular/core';
import { AnswerService } from './answers/answer.service';
import { Answer } from './answers/answer';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   title = 'YouQuizAngular';
  // answers: Answer[] = [];
  //
  // constructor(private answerService: AnswerService) {}
  //
   ngOnInit() {
  //   this.answerService.getAnswers().subscribe((data: Answer[]) => {
  //     this.answers = data;
  //   });
   }


  constructor(private router: Router) {}

  goToQuizsPage() {
    this.router.navigateByUrl('/quizs');
  }
}
