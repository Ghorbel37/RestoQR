import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategorieExpansionComponent } from './create-categorie-expansion.component';

describe('CreateCategorieExpansionComponent', () => {
  let component: CreateCategorieExpansionComponent;
  let fixture: ComponentFixture<CreateCategorieExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCategorieExpansionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategorieExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
