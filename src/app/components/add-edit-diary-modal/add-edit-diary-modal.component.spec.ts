import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDiaryModalComponent } from './add-edit-diary-modal.component';

describe('AddEditDiaryModalComponent', () => {
  let component: AddEditDiaryModalComponent;
  let fixture: ComponentFixture<AddEditDiaryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDiaryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDiaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
