import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraOptionsComponent } from './camera-options.component';

describe('CameraOptionsComponent', () => {
  let component: CameraOptionsComponent;
  let fixture: ComponentFixture<CameraOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraOptionsComponent]
    });
    fixture = TestBed.createComponent(CameraOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
