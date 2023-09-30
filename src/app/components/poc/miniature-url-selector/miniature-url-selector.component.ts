import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'miniature-url-selector',
  templateUrl: './miniature-url-selector.component.html',
  styleUrls: ['./miniature-url-selector.component.scss']
})
export class MiniatureUrlSelectorComponent {
  selectedMiniatureUrl: string = "";

  @Input() miniatureUrls: string[] = [];
  @Output() miniatureUrlSelected = new EventEmitter<string>();

  selectMiniatureUrl(miniatureUrl: string) {
    this.selectedMiniatureUrl = miniatureUrl;
    this.miniatureUrlSelected.emit(miniatureUrl);
  }
}
