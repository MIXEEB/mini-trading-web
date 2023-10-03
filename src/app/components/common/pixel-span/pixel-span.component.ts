import { Component, Input } from '@angular/core';

@Component({
  selector: 'pixel-span',
  templateUrl: './pixel-span.component.html',
  styleUrls: ['./pixel-span.component.scss']
})
export class PixelSpanComponent {
  @Input() text!: string;
  @Input() short: boolean = false;  
}
