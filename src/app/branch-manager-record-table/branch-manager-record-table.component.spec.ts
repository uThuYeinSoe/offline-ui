import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerRecordTableComponent } from './branch-manager-record-table.component';

describe('BranchManagerRecordTableComponent', () => {
  let component: BranchManagerRecordTableComponent;
  let fixture: ComponentFixture<BranchManagerRecordTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchManagerRecordTableComponent]
    });
    fixture = TestBed.createComponent(BranchManagerRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
