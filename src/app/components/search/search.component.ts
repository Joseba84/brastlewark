import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  term: string = "";

  @Output() searchTerm = new EventEmitter<string>();

  search() {
    this.searchTerm.emit(this.term.toString());
  }
}
