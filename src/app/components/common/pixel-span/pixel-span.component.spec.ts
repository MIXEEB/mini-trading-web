import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelSpanComponent } from './pixel-span.component';

describe('PixelSpanComponent', () => {
  let component: PixelSpanComponent;
  let fixture: ComponentFixture<PixelSpanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PixelSpanComponent]
    });
    fixture = TestBed.createComponent(PixelSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
