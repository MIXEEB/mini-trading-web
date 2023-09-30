import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MiniatureData } from 'src/app/models/miniature-data.interface';

@Component({
  selector: 'miniature-card',
  templateUrl: './miniature-card.component.html',
  styleUrls: ['./miniature-card.component.scss']
})
export class MiniatureCardComponent {
  @Input()
  miniatureData!: MiniatureData

  @Output()
  buy: EventEmitter<MiniatureData> = new EventEmitter<MiniatureData>();
}
