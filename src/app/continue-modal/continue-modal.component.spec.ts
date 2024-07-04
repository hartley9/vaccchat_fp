import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueModalComponent } from './continue-modal.component';

describe('ContinueModalComponent', () => {
  let component: ContinueModalComponent;
  let fixture: ComponentFixture<ContinueModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContinueModalComponent]
    });
    fixture = TestBed.createComponent(ContinueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
