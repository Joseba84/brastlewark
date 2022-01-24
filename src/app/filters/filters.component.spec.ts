import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setOrder', () => {
    it('should set Order', () => {
      component.setOrder('weight');

      expect(component.activeFilter).toEqual('weight');
    });

    it('should emit active filter', () => {
      spyOn(component.selectedFilter, 'emit');
      fixture.detectChanges();
      component.activeFilter = '';
      component.setOrder('weight')
      expect(component.selectedFilter.emit).toHaveBeenCalledWith('weight');
    })

    it(`shouln't set the same order if is active`, () => {
      component.activeFilter = 'weight';
      component.setOrder('weight');

      expect(component.activeFilter).toEqual('');
    });

    it('should empty value if seleceted filter is active', () => {
      spyOn(component.selectedFilter, 'emit');
      fixture.detectChanges();
      component.activeFilter = 'weight';
      component.setOrder('weight')
      expect(component.selectedFilter.emit).toHaveBeenCalledWith('');
    })
  });

});
