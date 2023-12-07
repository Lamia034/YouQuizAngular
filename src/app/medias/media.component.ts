
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaService } from './media.service';
import {Media, MediaType} from './media';
import { ReactiveFormsModule } from '@angular/forms';
import {Question, QuestionType} from "../questions/question";
import {QuestionService} from "../questions/question.service";
import {Subject} from "../subjects/subject";

@Component({
  selector: 'app-medias',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  types: string[] = Object.values(MediaType);
  medias: Media[] = [];
  questions: Question[] = [];
  isUpdateMode: boolean = false;
  selectedMediaId: number | null = null;
  updateForm!: FormGroup;
  showAddForm = false;
  addForm!: FormGroup;

  constructor(
    private questionService: QuestionService,
    private mediaService: MediaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      mediaTitle: ['', Validators.required],
      questionId: new FormControl( Validators.required),
      mediaType: new FormControl( Validators.required)

    });

    this.addForm = this.formBuilder.group({
      newMedia: ['', Validators.required],
      question: new FormControl( Validators.required),
      type: new FormControl( Validators.required)

    });

    const isMediasRoute = this.route.snapshot.url[0]?.path === 'medias';
    if (isMediasRoute) {
      this.fetchMedias();
    }
    this.loadQuestions();


  }



  loadQuestions() {
    this.questionService.getQuestions().subscribe(
      (data: Question[]) => {
        this.questions = data;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }


  fetchMedias() {
    this.mediaService.getMedias().subscribe(
      (data: Media[]) => {
        this.medias = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching medias:', error);
      }
    );
  }


  deleteMedia(mediaId: number) {
    this.mediaService.deleteMedia(mediaId).subscribe({
      next: () => {
        console.log('Media deleted successfully');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting media:', error);
      }
    });
  }

  updateMedia(mediaId: number) {
    this.isUpdateMode = true;
    this.selectedMediaId = mediaId;
    const media = this.medias.find(a => a.media_id === mediaId);
    if (media) {
      this.updateForm.patchValue({
        mediaTitle: media.title,
        questionId: media.question,
        mediaType: media.media_type
      });
    }
  }

  cancelUpdate() {
    this.isUpdateMode = false;
    this.selectedMediaId = null;
    this.updateForm.reset();
  }

  submitUpdate() {
    if (this.selectedMediaId !== null && this.updateForm.valid) {
      const updatedMediaTitle = this.updateForm.value.mediaTitle;
      const updatedMediaQuestionId = this.updateForm.value.questionId;
      const updatedMediaType = this.updateForm.value.mediaType;

      //   const updatedMediaParentId = Number(this.updateForm.value.parentId);
      const updatedMedia = {
        title: updatedMediaTitle,
        question_id: updatedMediaQuestionId,
        media_type: updatedMediaType
      };

      this.mediaService.updateMedia(this.selectedMediaId, updatedMedia).subscribe(
        (response) => {
          console.log('Media updated successfully');
          this.cancelUpdate();

          this.fetchMedias();
          console.log("fetched?");
        },
        (error) => {
          console.error('Error updating media:', error);
        }
      );
    }
  }


  submitNewMedia() {
    console.log('Submit new media method called');
    if (this.addForm.valid) {
      const newMediaTitle = this.addForm.value.newMedia;
      const questionMediaId = this.addForm.value.question;
      const questionMediaType = this.addForm.value.type;

      const addedMedia = {
        title: newMediaTitle,
        question_id: questionMediaId,
        type:questionMediaType

      };
      this.mediaService.addMedia(addedMedia).subscribe(
        (response) => {
          console.log('Media created successfully');
          this.cancelAdd();
          this.fetchMedias();
        },
        (error) => {
          console.error('Error creating media:', error);
        }
      );
    }
  }
  cancelAdd() {
    this.addForm.reset();
    this.showAddForm = false;
  }
}
