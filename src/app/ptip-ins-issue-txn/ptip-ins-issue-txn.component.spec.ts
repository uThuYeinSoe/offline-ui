import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtipInsIssueTxnComponent } from './ptip-ins-issue-txn.component';

describe('PtipInsIssueTxnComponent', () => {
  let component: PtipInsIssueTxnComponent;
  let fixture: ComponentFixture<PtipInsIssueTxnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PtipInsIssueTxnComponent]
    });
    fixture = TestBed.createComponent(PtipInsIssueTxnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
