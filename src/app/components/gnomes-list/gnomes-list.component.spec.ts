import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GnomesListComponent } from './gnomes-list.component';
import { gnome1, gnome2, gnome3, gnome4, gnomes } from '../../spec-helpers/gnome.spec-helper';
import { By } from '@angular/platform-browser';
import { Gnome } from '../../models/gnome';

describe('GnomesListComponent', () => {
  let component: GnomesListComponent;
  let fixture: ComponentFixture<GnomesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GnomesListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnomesListComponent);
    component = fixture.componentInstance;
    component.gnomesByPagination = component.chunkPopulation(gnomes, 2);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ChunkData', () => {
    it('should return splited array', () => {
      const chunkedData: Gnome[][] = component.chunkPopulation(gnomes, 2);
      const expectedData: Gnome[][] = [[gnome1, gnome2], [gnome3, gnome4]];

      expect(chunkedData.length).toBe(2);
      expect(chunkedData).toEqual(expectedData);
    });
  });

  describe('Pagination', () => {
    describe("increment", () => {
      it('should increment pag', () => {
        component.nextPag();

        expect(component.currentPag).toBe(1);
      });

      it(`it shouldn't increment if limit is reached`, () => {
        component.currentPag = component.gnomesByPagination.length;
        component.nextPag();

        expect(component.currentPag).toBe(2);
      });
    });

    describe('decrement', () => {
      it('should decrement pag', () => {
        component.currentPag = 5;
        component.prevPag();

        expect(component.currentPag).toBe(4);
      });

      it(`it shouldn't decrement if is first position`, () => {
        component.currentPag = 0;
        component.prevPag();

        expect(component.currentPag).toBe(0);
      });
    });

    describe('buttons', () => {
      it('should call nextPag when click on "Next"', fakeAsync(() => {
        spyOn(component, 'nextPag');
        component.nextPag();

        fixture.detectChanges();

        fixture.debugElement.query(By.css('.nextPag')).nativeElement.click();
        expect(component.nextPag).toHaveBeenCalled();
      }));

      it('should call prevPag when click on "Previous"', fakeAsync(() => {
        spyOn(component, 'prevPag');
        component.prevPag();

        fixture.detectChanges();

        fixture.debugElement.query(By.css('.prevPag')).nativeElement.click();
        expect(component.prevPag).toHaveBeenCalled();
      }));

      it('should call goToPag when click on "First"', fakeAsync(() => {
        spyOn(component, 'goToPag');
        component.goToPag("first");

        fixture.detectChanges();

        fixture.debugElement.query(By.css('.goToFirstPag')).nativeElement.click();
        expect(component.goToPag).toHaveBeenCalledWith("first");
      }));

      it('should call goToPag when click on "Last"', fakeAsync(() => {
        spyOn(component, 'goToPag');
        component.goToPag("last");

        fixture.detectChanges();

        fixture.debugElement.query(By.css('.goToLastPag')).nativeElement.click();
        expect(component.goToPag).toHaveBeenCalledWith("last");
      }));
    });
  });
});
