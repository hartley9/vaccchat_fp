import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDownloadModalComponent } from './confirm-download-modal.component';

describe('ConfirmDownloadModalComponent', () => {
  let component: ConfirmDownloadModalComponent;
  let fixture: ComponentFixture<ConfirmDownloadModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDownloadModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmDownloadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
