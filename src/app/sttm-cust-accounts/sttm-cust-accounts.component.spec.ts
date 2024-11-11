import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SttmCustAccountsComponent } from './sttm-cust-accounts.component';

describe('SttmCustAccountsComponent', () => {
  let component: SttmCustAccountsComponent;
  let fixture: ComponentFixture<SttmCustAccountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SttmCustAccountsComponent]
    });
    fixture = TestBed.createComponent(SttmCustAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
