import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBlocksComponent } from './question-blocks.component';

describe('QuestionBlocksComponent', () => {
  let component: QuestionBlocksComponent;
  let fixture: ComponentFixture<QuestionBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionBlocksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
