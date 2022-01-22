import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveWarningModalComponent } from './remove-warning-modal.component';

describe('RemoveWarningModalComponent', () => {
  let component: RemoveWarningModalComponent;
  let fixture: ComponentFixture<RemoveWarningModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveWarningModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveWarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
