import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatmCheckDetailsComponent } from './catm-check-details.component';

describe('CatmCheckDetailsComponent', () => {
  let component: CatmCheckDetailsComponent;
  let fixture: ComponentFixture<CatmCheckDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatmCheckDetailsComponent],
    });
    fixture = TestBed.createComponent(CatmCheckDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
