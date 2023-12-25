import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutuserComponent } from './ajoutuser.component';

describe('AjoutuserComponent', () => {
  let component: AjoutuserComponent;
  let fixture: ComponentFixture<AjoutuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutuserComponent]
    });
    fixture = TestBed.createComponent(AjoutuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
