import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerComponent } from './answer.component';
import { AnswerService } from './answer.service';
import { of } from 'rxjs';
import { Answer } from './answer';

describe('AnswerComponent', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;
  let answerService: AnswerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnswerComponent],
      providers: [AnswerService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    answerService = TestBed.inject(AnswerService);
  });

  it('should fetch answers and assign them to answers property', () => {
    const mockAnswers: Answer[] = [
      { answer_id: 1, text: 'Answer 1' },
      { answer_id: 2, text: 'Answer 2' },
      { answer_id: 3, text: 'Answer 3' }
    ];

    spyOn(answerService, 'getAnswers').and.returnValue(of(mockAnswers));

    fixture.detectChanges();

    expect(component.answers).toEqual(mockAnswers);
  });
});
