import { Component, OnInit } from '@angular/core';
import { Gnome } from '../../models/gnome';
import { GnomeService, GnomeApiResponse } from 'src/app/services/gnome.service';

@Component({
  selector: 'app-gnomes-list',
  templateUrl: './gnomes-list.component.html',
  styleUrls: ['./gnomes-list.component.scss']
})

export class GnomesListComponent implements OnInit {
  gnomesByPagination: Gnome[][];
  paginationItems: number = 20;
  currentPag: number = 0;


  constructor(private gnomesService: GnomeService) {}

  ngOnInit(): void {
    this.gnomesService.getData().subscribe((data: GnomeApiResponse) => {
      this.gnomesService.setPopulationData(data.Brastlewark);
      this.gnomesService.setPaginationData(this.paginationItems);
      this.gnomesByPagination = this.gnomesService.getPaginationData();
    });
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
