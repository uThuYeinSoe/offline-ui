import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouRecordsComponent } from './cou-records.component';

describe('CouRecordsComponent', () => {
  let component: CouRecordsComponent;
  let fixture: ComponentFixture<CouRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouRecordsComponent]
    });
    fixture = TestBed.createComponent(CouRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
