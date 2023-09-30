import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniatureGalleryComponent } from './miniature-gallery.component';

describe('MiniatureGalleryComponent', () => {
  let component: MiniatureGalleryComponent;
  let fixture: ComponentFixture<MiniatureGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniatureGalleryComponent]
    });
    fixture = TestBed.createComponent(MiniatureGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
