import { Component, OnInit } from '@angular/core';
import { Gnome } from '../../models/gnome';
import { GnomeService, GnomeApiResponse } from 'src/app/services/gnome.service';

@Component({
  selector: 'app-gnomes-list',
  templateUrl: './gnomes-list.component.html',
  styleUrls: ['./gnomes-list.component.scss']
})

export class GnomesListComponent implements OnInit {
  gnomesPopulation?: Gnome[];
  gnomesByPagination: Gnome[][];
  paginationsItems: number = 20;
  currentPag: number = 0;


  constructor(private gnomesService: GnomeService) { }

  ngOnInit(): void {
    this.getGnomesPopulationData();
  }

  getGnomesPopulationData() {
    this.gnomesService.getPopulation()
    .subscribe(data => {
      this.gnomesPopulation = data.Brastlewark;
      this.gnomesByPagination = this.chunkPopulation(data.Brastlewark, this.paginationsItems);
    },
    error => console.error(error));
  };

  chunkPopulation(data: Gnome[], size: number): Gnome[][] {
    const chunkData = [];
    for (var index = 0; index < data.length; index += size) {
      chunkData.push(data.slice(index, index + size));
    }
    JSON.stringify(chunkData);
    return chunkData || [];
  }

  nextPag() {
    if (this.currentPag >= this.gnomesByPagination.length - 1) {
      return this.currentPag;
    }
    this.currentPag++;
  }

  prevPag() {
    if (this.currentPag === 0) {
      return this.currentPag;
    }
    this.currentPag--;
  }

  goToPag(option: string) {
    if (option === "first") {
      return this.currentPag = 0;
    }

    this.currentPag = this.gnomesByPagination.length - 1;
  }
}
