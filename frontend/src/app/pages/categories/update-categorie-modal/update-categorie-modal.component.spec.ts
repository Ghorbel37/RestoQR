import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategorieModalComponent } from './update-categorie-modal.component';

describe('UpdateCategorieModalComponent', () => {
  let component: UpdateCategorieModalComponent;
  let fixture: ComponentFixture<UpdateCategorieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCategorieModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategorieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
