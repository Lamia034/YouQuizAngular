// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { AnswerService } from './answer.service';
// import { Answer } from './answer';
//
// @Component({
//   selector: 'app-answers',
//   templateUrl: './answer.component.html',
//   styleUrls: ['./answer.component.css']
// })
// export class AnswerComponent implements OnInit {
//   answers: Answer[] = [];
//
//   constructor(
//     private answerService: AnswerService,
//     private route: ActivatedRoute
//   ) {}
//
//   ngOnInit() {
//     const isAnswersRoute = this.route.snapshot.url[0]?.path === 'answers';
//     if (isAnswersRoute) {
//       this.answerService.getAnswers().subscribe(
//         (data: Answer[]) => {
//           this.answers = data;
//           console.log(data); // Assign the fetched data to a local variable
//         },
//         (error) => {
//           console.error('Error fetching answers:', error);
//         }
//       );
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from './answer.service';
import { Answer } from './answer';

@Component({
    selector: 'app-answers',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
    answers: Answer[] = [];
    isUpdateMode: boolean = false;
    selectedAnswerId: number | null = null;
    updateForm!: FormGroup;
    showAddForm = false;
    addForm!: FormGroup;

    constructor(
        private answerService: AnswerService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.updateForm = this.formBuilder.group({
            updatedAnswer: ['']
        });

        this.addForm = this.formBuilder.group({
            newAnswer: ['', Validators.required]
        });

        const isAnswersRoute = this.route.snapshot.url[0]?.path === 'answers';
        if (isAnswersRoute) {
            this.fetchAnswers();
        }
    }

    fetchAnswers() {
        this.answerService.getAnswers().subscribe(
            (data: Answer[]) => {
                this.answers = data;
                console.log(data);
            },
            (error) => {
                console.error('Error fetching answers:', error);
            }
        );
    }

    deleteAnswer(answerId: number) {
        this.answerService.deleteAnswer(answerId).subscribe({
            next: () => {
                console.log('Answer deleted successfully');
                window.location.reload();
            },
            error: (error) => {
                console.error('Error deleting answer:', error);
            }
        });
    }

    updateAnswer(answerId: number) {
        this.isUpdateMode = true;
        this.selectedAnswerId = answerId;
        const answer = this.answers.find(a => a.answer_id === answerId);
        if (answer) {
            this.updateForm.patchValue({
                updatedAnswer: answer.text
            });
        }
    }

    cancelUpdate() {
        this.isUpdateMode = false;
        this.selectedAnswerId = null;
        this.updateForm.reset();
    }

    submitUpdate() {
        if (this.selectedAnswerId !== null && this.updateForm.valid) {
            const updatedAnswer = this.updateForm.value.updatedAnswer;
            this.answerService.updateAnswer(this.selectedAnswerId, updatedAnswer).subscribe(
                (response) => {
                    console.log('Answer updated successfully');
                    this.cancelUpdate();
                    this.fetchAnswers();
                },
                (error) => {
                    console.error('Error updating answer:', error);
                }
            );
        }


    }



    submitNewAnswer() {
        console.log('Submit new answer method called');
        if (this.addForm.valid) {
            const newAnswer = this.addForm.value.newAnswer;
            console.log(newAnswer);
            this.answerService.addAnswer(newAnswer).subscribe(
                (response) => {
                    console.log('Answer added successfully');
                    this.cancelAdd();
                    this.fetchAnswers();
                },
                (error) => {
                    console.error('Error adding answer:', error);
                }
            );
        }
    }
    cancelAdd() {
        this.addForm.reset();
        this.showAddForm = false;
    }
}
    // updateAnswer(answerId: number, updatedAnswer: string): void {
    //     const url = `http://localhost:8080/answers/${answerId}`;
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //
    //     const body = {
    //         text: updatedAnswer
    //     };
    //
    //     this.http.put(url, body, {headers}).subscribe(
    //         (response) => {
    //             console.log('Answer updated successfully');
    //             // Optionally, perform any additional actions after successful update
    //         },
    //         (error) => {
    //             console.error('Error updating answer:', error);
    //         }
    //     );








// import { Component, OnInit } from '@angular/core';
// import { AnswerService } from './answer.service';
// import { Answer } from './answer';
//
// @Component({
//   selector: 'app-answers',
//   templateUrl: './answer.component.html',
//   styleUrls: ['./answer.component.css']
// })
// export class AnswerComponent implements OnInit {
//   answers: Answer[] = [];
//
//   constructor(private answerService: AnswerService) {}
//
//   ngOnInit() {
//     this.answerService.getAnswers().subscribe((data: Answer[]) => {
//         this.answers = data;
//         console.log(data);// Assign the fetched data to a local variable
//       },
//       (error) => {
//         console.error('Error fetching answers:', error);
//
//     });
//   }
// }
