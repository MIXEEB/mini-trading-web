import { Component, Input } from '@angular/core';
import { MiniatureData } from 'src/app/models/miniature-data.interface';

@Component({
  selector: 'miniature-gallery',
  templateUrl: './miniature-gallery.component.html',
  styleUrls: ['./miniature-gallery.component.scss']
})
export class MiniatureGalleryComponent {
  @Input()
  miniatures: MiniatureData[] = [];
}
