import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  term: string = '';

  constructor(private gnomesService: GnomeService) {}
  @Output() sendGnome = new EventEmitter<Gnome>();

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

  search(searchTerm: string) {
    this.term = searchTerm;
    this.gnomesService.filterData(searchTerm, this.paginationItems);
    this.setPagination();
  }

  showDetail(gnome : Gnome) {
    this.sendGnome.emit(gnome);
  }

  setOrder(event: string) {
    this.gnomesService.filterData(this.term, this.paginationItems, event);
    this.setPagination();
  }

  setPagination() {
    this.currentPag = 0;
    this.gnomesByPagination = this.gnomesService.getPaginationData();
  }
}
