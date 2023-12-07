
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from './level.service';
import { Level } from './level';

@Component({
  selector: 'app-levels',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  levels: Level[] = [];
  isUpdateMode: boolean = false;
  selectedLevelId: number | null = null;
  updateForm!: FormGroup;
  showAddForm = false;
  addForm!: FormGroup;

  constructor(
    private levelService: LevelService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateForm = new FormGroup({
      levelDescription: new FormControl('', Validators.required),
      levelMaxPoint: new FormControl(0, Validators.required),
      levelMinPoint: new FormControl(0, Validators.required)
    });

    this.addForm = this.formBuilder.group({
      newLevel: ['', Validators.required],
      maxPoint: new FormControl(0, Validators.required),
      minPoint: new FormControl(0, Validators.required)
    });

    const isLevelsRoute = this.route.snapshot.url[0]?.path === 'levels';
    if (isLevelsRoute) {
      this.fetchLevels();
    }
  }

  fetchLevels() {
    this.levelService.getLevels().subscribe(
      (data: Level[]) => {
        this.levels = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching levels:', error);
      }
    );
  }

  deleteLevel(levelId: number) {
    this.levelService.deleteLevel(levelId).subscribe({
      next: () => {
        console.log('Level deleted successfully');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting level:', error);
      }
    });
  }

  updateLevel(levelId: number) {
    this.isUpdateMode = true;
    this.selectedLevelId = levelId;
    const level = this.levels.find(a => a.level_id === levelId);
    if (level) {
      this.updateForm.patchValue({
        levelDescription: level.description,
        levelMaxPoint: level.maxPoints,
        levelMinPoint: level.minPoints
      });
      const levelMaxPoint = level.maxPoints;
  //    console.log(levelMaxPoint);
    }
  }

  cancelUpdate() {
    this.isUpdateMode = false;
    this.selectedLevelId = null;
    this.updateForm.reset();
  }

  submitUpdate() {
    if (this.selectedLevelId !== null && this.updateForm.valid) {
      const updatedLevelDescription = this.updateForm.value.levelDescription;
      const updatedLevelMaxPoint = this.updateForm.value.levelMaxPoint;
      const updatedLevelMinPoint = this.updateForm.value.levelMinPoint;
    //  console.log(updatedLevelMaxPoint);

      const updatedLevel = {
        description: updatedLevelDescription,
        maxPoints: updatedLevelMaxPoint,
        minPoints: updatedLevelMinPoint
      };

      this.levelService.updateLevel(this.selectedLevelId, updatedLevel).subscribe(
        (response) => {
          console.log('Level updated successfully');
          this.cancelUpdate();
          this.fetchLevels();
        },
        (error) => {
          console.error('Error updating level:', error);
        }
      );
    }
  }



  submitNewLevel() {
    console.log('Submit new level method called');
    if (this.addForm.valid) {
      const newLevel = this.addForm.value.newLevel;
      const maxPoint = this.addForm.value.maxPoint;
      const minPoint = this.addForm.value.minPoint;
      console.log(newLevel);
      const addedLevel = {
        description: newLevel,
        maxPoints: maxPoint,
        minPoints: minPoint
      };

      this.levelService.addLevel(addedLevel).subscribe(
        (response) => {
          console.log('Level added successfully');
          this.cancelAdd();
          this.fetchLevels();
        },
        (error) => {
          console.error('Error adding level:', error);
        }
      );
    }
  }
  cancelAdd() {
    this.addForm.reset();
    this.showAddForm = false;
  }
}
