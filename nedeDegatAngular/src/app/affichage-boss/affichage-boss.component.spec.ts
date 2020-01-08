import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageBossComponent } from './affichage-boss.component';

describe('AffichageBossComponent', () => {
  let component: AffichageBossComponent;
  let fixture: ComponentFixture<AffichageBossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffichageBossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichageBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
