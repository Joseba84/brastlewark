import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  activeFilter: string;
  @Output() selectedFilter = new EventEmitter<string>();

  // send orderBy 'height' or 'weight' to gnome-list component
  setOrder(filter: string) {
    if (filter === this.activeFilter) {
      this.activeFilter = '';
      this.selectedFilter.emit('');
    } else {
      this.activeFilter = filter;
      this.selectedFilter.emit(filter);
    }
  }

  isActive(filter: string) {
    return filter === this.activeFilter ? 'selected': '';
  }

}
