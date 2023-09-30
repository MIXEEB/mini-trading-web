import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniatureCardComponent } from './miniature-card.component';

describe('MiniatureCardComponent', () => {
  let component: MiniatureCardComponent;
  let fixture: ComponentFixture<MiniatureCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniatureCardComponent]
    });
    fixture = TestBed.createComponent(MiniatureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
