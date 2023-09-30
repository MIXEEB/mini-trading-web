import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pixel-button',
  templateUrl: './pixel-button.component.html',
  styleUrls: ['./pixel-button.component.scss']
})
export class PixelButtonComponent {
  @Input() disabled: boolean = false;
  @Input() text!: string;
  @Output() clickButton = new EventEmitter<void>();
}
