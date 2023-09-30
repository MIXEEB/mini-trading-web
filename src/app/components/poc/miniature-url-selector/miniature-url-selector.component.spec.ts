import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniatureUrlSelectorComponent } from './miniature-url-selector.component';

describe('MiniatureUrlSelectorComponent', () => {
  let component: MiniatureUrlSelectorComponent;
  let fixture: ComponentFixture<MiniatureUrlSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniatureUrlSelectorComponent]
    });
    fixture = TestBed.createComponent(MiniatureUrlSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
