import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizdetailsComponent } from './quizdetail.component';

describe('QuizdetailsComponent', () => {
  let component: QuizdetailsComponent;
  let fixture: ComponentFixture<QuizdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizdetailsComponent]
    });
    fixture = TestBed.createComponent(QuizdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
