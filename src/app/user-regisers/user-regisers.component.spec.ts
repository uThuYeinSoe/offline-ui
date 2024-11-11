import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisersComponent } from './user-regisers.component';

describe('UserRegisersComponent', () => {
  let component: UserRegisersComponent;
  let fixture: ComponentFixture<UserRegisersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegisersComponent],
    });
    fixture = TestBed.createComponent(UserRegisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
