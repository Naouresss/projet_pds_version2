import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutmeetingComponent } from './ajoutmeeting.component';

describe('AjoutmeetingComponent', () => {
  let component: AjoutmeetingComponent;
  let fixture: ComponentFixture<AjoutmeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutmeetingComponent]
    });
    fixture = TestBed.createComponent(AjoutmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
