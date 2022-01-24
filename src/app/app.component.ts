import { Component } from '@angular/core';
import { Gnome } from './models/gnome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Brastlewark';
  gnome: Gnome;
  gnomeForTeam: Gnome;

  setGnome(gnome: Gnome) {
    this.gnome = gnome;
  }

  recruit(gnome: Gnome) {
    this.gnomeForTeam = gnome;
  }
}
