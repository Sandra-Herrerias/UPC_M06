import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutgameComponent } from './aboutgame.component';

describe('AboutgameComponent', () => {
  let component: AboutgameComponent;
  let fixture: ComponentFixture<AboutgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutgameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
