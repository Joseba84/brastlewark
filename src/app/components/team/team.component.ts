import { Component, Input, SimpleChanges } from '@angular/core';
import { Gnome } from '../../models/gnome';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  @Input() gnome: Gnome;
  gnomes: Gnome[] = [];
  private limit: number = 4;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.gnome.currentValue) {
      this.addNewGnome(this.gnome);
    }
  }

  addNewGnome(gnome: Gnome) {
    if (this.gnomes.length === this.limit) {
        alert("Limit of Gnomes for your team has been reached");
      return;
    }
    this.gnomes.push(gnome);
  }

  clear() {
    this.gnomes = [];
  }
}
