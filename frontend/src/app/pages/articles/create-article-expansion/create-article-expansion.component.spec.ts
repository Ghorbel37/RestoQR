import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticleExpansionComponent } from './create-article-expansion.component';

describe('CreateArticleExpansionComponent', () => {
  let component: CreateArticleExpansionComponent;
  let fixture: ComponentFixture<CreateArticleExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateArticleExpansionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateArticleExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
