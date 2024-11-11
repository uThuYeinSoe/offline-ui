import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouSingletransitionComponent } from './cou-singletransition.component';

describe('CouSingletransitionComponent', () => {
  let component: CouSingletransitionComponent;
  let fixture: ComponentFixture<CouSingletransitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouSingletransitionComponent]
    });
    fixture = TestBed.createComponent(CouSingletransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
