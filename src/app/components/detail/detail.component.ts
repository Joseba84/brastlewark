import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Gnome } from '../../models/gnome';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  @Input() gnome: Gnome;
  @Output() sendGnome = new EventEmitter<Gnome>();

  recruit() {
    this.sendGnome.emit(this.gnome);
  }

  fixDecimals(value: number) {
    return value.toFixed(2);
  }
}
