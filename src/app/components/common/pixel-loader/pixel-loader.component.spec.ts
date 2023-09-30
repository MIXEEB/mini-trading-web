import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelLoaderComponent } from './pixel-loader.component';

describe('PixelLoaderComponent', () => {
  let component: PixelLoaderComponent;
  let fixture: ComponentFixture<PixelLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PixelLoaderComponent]
    });
    fixture = TestBed.createComponent(PixelLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
