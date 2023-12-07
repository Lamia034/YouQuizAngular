import { Component, OnInit } from '@angular/core';
import { AnswerService } from './answers/answer.service';
import { Answer } from './answers/answer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'YouQuizAngular';
  answers: Answer[] = [];

  constructor(private answerService: AnswerService) {}

  ngOnInit() {
    this.answerService.getAnswers().subscribe((data: Answer[]) => {
      this.answers = data;
    });
  }
}
