import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouHistoriesComponent } from './cou-histories.component';

describe('CouHistoriesComponent', () => {
  let component: CouHistoriesComponent;
  let fixture: ComponentFixture<CouHistoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouHistoriesComponent]
    });
    fixture = TestBed.createComponent(CouHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
