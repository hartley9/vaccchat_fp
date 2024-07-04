import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceFilterPageComponent } from './face-filter-page.component';

describe('FaceFilterPageComponent', () => {
  let component: FaceFilterPageComponent;
  let fixture: ComponentFixture<FaceFilterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaceFilterPageComponent],
    });
    fixture = TestBed.createComponent(FaceFilterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
