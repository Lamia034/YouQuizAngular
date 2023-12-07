import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelComponent } from './level.component';
import { LevelService } from './level.service';
import { of } from 'rxjs';
import { Level } from './level';

describe('LevelComponent', () => {
  let component: LevelComponent;
  let fixture: ComponentFixture<LevelComponent>;
  let levelService: LevelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelComponent],
      providers: [LevelService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelComponent);
    component = fixture.componentInstance;
    levelService = TestBed.inject(LevelService);
  });

  it('should fetch levels and assign them to levels property', () => {
    const mockLevels: Level[] = [
      { level_id: 1, description: 'Level 1',maxPoints:3,minPoints: 1 },
      { level_id: 2,  description: 'Level 2',maxPoints:4,minPoints: 2 },
      { level_id: 3,  description: 'Level 3',maxPoints:5,minPoints: 3 }
    ];

    spyOn(levelService, 'getLevels').and.returnValue(of(mockLevels));

    fixture.detectChanges();

    expect(component.levels).toEqual(mockLevels);
  });
});
