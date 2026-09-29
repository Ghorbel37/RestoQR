import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRestoComponent } from './profile-resto.component';

describe('ProfileRestoComponent', () => {
  let component: ProfileRestoComponent;
  let fixture: ComponentFixture<ProfileRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
