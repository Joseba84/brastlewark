import { Component, Input } from '@angular/core';
import { Gnome } from '../../models/gnome';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  @Input() gnome: Gnome;
}
