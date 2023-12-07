
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from './question.service';
import {Question, QuestionType} from './question';
import { ReactiveFormsModule } from '@angular/forms';
import {Subject} from "../subjects/subject";
import {Level} from "../levels/level";
import {LevelService} from "../levels/level.service";
import {SubjectComponent} from "../subjects/subject.component";
import {LevelComponent} from "../levels/level.component";
import {SubjectService} from "../subjects/subject.service";

@Component({
  selector: 'app-questions',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  types: string[] = Object.values(QuestionType);
  questions: Question[] = [];
  subjects: Subject[] = [];
  levels: Level[] = [];
  isUpdateMode: boolean = false;
  selectedQuestionId: number | null = null;
  updateForm!: FormGroup;
  showAddForm = false;
  addForm!: FormGroup;

  constructor(
    private questionService: QuestionService,
    private levelService: LevelService,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      questionText: ['', Validators.required],
      subjectId: new FormControl( Validators.required),
      levelId: new FormControl( Validators.required),
      questionType: new FormControl( Validators.required)
    });

    this.addForm = this.formBuilder.group({
      newQuestion: ['', Validators.required],
      subject: new FormControl( Validators.required),
      level: new FormControl( Validators.required),
      type: new FormControl( Validators.required)
    });



    const isQuestionsRoute = this.route.snapshot.url[0]?.path === 'questions';
    if (isQuestionsRoute) {
      this.fetchQuestions();

    }
    this.loadSubjects();
    this.loadLevels();


  }



  loadSubjects() {
    this.subjectService.getSubjects().subscribe(
      (data: Subject[]) => {
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );
  }

  loadLevels() {
    this.levelService.getLevels().subscribe(
      (data: Level[]) => {
        this.levels = data;
      },
      (error) => {
        console.error('Error fetching levels:', error);
      }
    );
  }

  fetchQuestions() {
    this.questionService.getQuestions().subscribe(
      (data: Question[]) => {
        this.questions = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }



  deleteQuestion(questionId: number) {
    this.questionService.deleteQuestion(questionId).subscribe({
      next: () => {
        console.log('Question deleted successfully');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting question:', error);
      }
    });
  }

  updateQuestion(questionId: number) {
    this.isUpdateMode = true;
    this.selectedQuestionId = questionId;
    const question = this.questions.find(a => a.question_id === questionId);
    if (question) {
      this.updateForm.patchValue({
        questionText: question.text,
        subjectId: question.subject,
        levelId:question.level,
        questionType:question.question_type
      });
    }
  }

  cancelUpdate() {
    this.isUpdateMode = false;
    this.selectedQuestionId = null;
    this.updateForm.reset();
  }

  submitUpdate() {
    if (this.selectedQuestionId !== null && this.updateForm.valid) {
      const QuestionText = this.updateForm.value.questionText;
      const LevelId = this.updateForm.value.levelId;
      console.log(LevelId);
      const SubjectId = this.updateForm.value.subjectId;
      const Type = this.updateForm.value.questionType;

      const updatedQuestion = {
        text: QuestionText,
        level_id: LevelId,
        subject_id:SubjectId,
        question_type:Type
      };

      this.questionService.updateQuestion(this.selectedQuestionId, updatedQuestion).subscribe(
        (response) => {
          console.log('Question updated successfully');
          this.cancelUpdate();

          this.fetchQuestions();
          console.log("fetched?");
        },
        (error) => {
          console.error('Error updating question:', error);
        }
      );
    }
  }


  submitNewQuestion() {
    console.log('Submit new question method called');
    if (this.addForm.valid) {
      const newQuestionTitle = this.addForm.value.newQuestion;
      const LevelId = this.addForm.value.level;
      console.log(LevelId);
      const SubjectId = this.addForm.value.subject;
      const Type = this.addForm.value.type;

      const addedQuestion = {
        text: newQuestionTitle,
        level_id: LevelId,
        subject_id:SubjectId,
        question_type:Type
      };
      console.log(addedQuestion);
      this.questionService.addQuestion(addedQuestion).subscribe(
        (response) => {
          console.log('Question created successfully');
          this.cancelAdd();
          this.fetchQuestions();
        },
        (error) => {
          console.error('Error creating question:', error);
        }
      );
    }
  }
  cancelAdd() {
    this.addForm.reset();
    this.showAddForm = false;
  }
}
