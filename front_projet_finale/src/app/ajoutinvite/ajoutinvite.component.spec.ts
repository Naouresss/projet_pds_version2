import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutinviteComponent } from './ajoutinvite.component';

describe('AjoutinviteComponent', () => {
  let component: AjoutinviteComponent;
  let fixture: ComponentFixture<AjoutinviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutinviteComponent]
    });
    fixture = TestBed.createComponent(AjoutinviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
