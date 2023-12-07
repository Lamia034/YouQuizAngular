
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from './subject.service';
import { Subject } from './subject';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-subjects',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  isUpdateMode: boolean = false;
  selectedSubjectId: number | null = null;
  updateForm!: FormGroup;
  showAddForm = false;
  addForm!: FormGroup;

  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      subjectTitle: ['', Validators.required],
      parentId: new FormControl( Validators.required)
    });

    this.addForm = this.formBuilder.group({
      newSubject: ['', Validators.required],
      parent: new FormControl( Validators.required)
    });

    const isSubjectsRoute = this.route.snapshot.url[0]?.path === 'subjects';
    if (isSubjectsRoute) {
      this.fetchSubjects();
    }
  }

  fetchSubjects() {
    this.subjectService.getSubjects().subscribe(
      (data: Subject[]) => {
        this.subjects = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );
  }


  // getParentTitle(parentId: number){
  //   return this.subjectService.getParentTitle(parentId);
  // }

  deleteSubject(subjectId: number) {
    this.subjectService.deleteSubject(subjectId).subscribe({
      next: () => {
        console.log('Subject deleted successfully');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting subject:', error);
      }
    });
  }

  updateSubject(subjectId: number) {
    this.isUpdateMode = true;
    this.selectedSubjectId = subjectId;
    const subject = this.subjects.find(a => a.subject_id === subjectId);
    if (subject) {
      this.updateForm.patchValue({
        subjectTitle: subject.title,
        parentId: subject.parent
      });
    }
  }

  cancelUpdate() {
    this.isUpdateMode = false;
    this.selectedSubjectId = null;
    this.updateForm.reset();
  }

  submitUpdate() {
    if (this.selectedSubjectId !== null && this.updateForm.valid) {
      const updatedSubjectTitle = this.updateForm.value.subjectTitle;
      const updatedSubjectParentId = this.updateForm.value.parentId;

   //   const updatedSubjectParentId = Number(this.updateForm.value.parentId);
      const updatedSubject = {
        title: updatedSubjectTitle,
        parent_id: updatedSubjectParentId
      };

      this.subjectService.updateSubject(this.selectedSubjectId, updatedSubject).subscribe(
        (response) => {
          console.log('Subject updated successfully');
          this.cancelUpdate();

          this.fetchSubjects();
          console.log("fetched?");
        },
        (error) => {
          console.error('Error updating subject:', error);
        }
      );
    }
  }


  submitNewSubject() {
    console.log('Submit new subject method called');
    if (this.addForm.valid) {
      const newSubjectTitle = this.addForm.value.newSubject;
      const parentSubjectId = this.addForm.value.parent;


      const addedSubject = {
        title: newSubjectTitle,
        parent_id: parentSubjectId
      };
      this.subjectService.addSubject(addedSubject).subscribe(
        (response) => {
          console.log('Subject created successfully');
          this.cancelAdd();
          this.fetchSubjects();
        },
        (error) => {
          console.error('Error creating subject:', error);
        }
      );
    }
  }
  cancelAdd() {
    this.addForm.reset();
    this.showAddForm = false;
  }
}
