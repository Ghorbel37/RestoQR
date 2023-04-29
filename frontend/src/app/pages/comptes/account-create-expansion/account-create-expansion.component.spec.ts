import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreateExpansionComponent } from './account-create-expansion.component';

describe('AccountCreateExpansionComponent', () => {
  let component: AccountCreateExpansionComponent;
  let fixture: ComponentFixture<AccountCreateExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCreateExpansionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCreateExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
