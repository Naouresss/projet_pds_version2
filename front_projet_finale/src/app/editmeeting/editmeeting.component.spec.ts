import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmeetingComponent } from './editmeeting.component';

describe('EditmeetingComponent', () => {
  let component: EditmeetingComponent;
  let fixture: ComponentFixture<EditmeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditmeetingComponent]
    });
    fixture = TestBed.createComponent(EditmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
