import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArticleModalComponent } from './update-article-modal.component';

describe('UpdateArticleModalComponent', () => {
  let component: UpdateArticleModalComponent;
  let fixture: ComponentFixture<UpdateArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateArticleModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
