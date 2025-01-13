import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryQuestionComponent } from './category-question.component';

describe('CategoryQuestionComponent', () => {
  let component: CategoryQuestionComponent;
  let fixture: ComponentFixture<CategoryQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
