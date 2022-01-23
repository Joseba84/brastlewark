import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { gnome1, gnome2, gnome3, gnome4, gnomes } from '../spec-helpers/gnome.spec-helper';
import { GnomeService, GnomeApiResponse } from './gnome.service';

describe('GnomeService', () => {
  let service: GnomeService;
  let controller: HttpTestingController;

  const expectedUrl = "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GnomeService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return population of gnomes', () => {
    service.getData().subscribe((res) => {
      const expectedResponse: GnomeApiResponse = { Brastlewark: gnomes };
      expect(res).toEqual(expectedResponse);
    });

    controller.expectOne(expectedUrl).flush({ Brastlewark: gnomes });
  });

  it('return population chunked data for pagination', () => {
      const itemsPerPag = 2;
      service.setPopulationData(gnomes);
      service.setPaginationData(itemsPerPag);

      expect(service.getPaginationData()).toEqual([[gnome1, gnome2],[gnome3, gnome4]])
  });

  it('passes through search errors', () => {
    const status = 500;
    const statusText = 'Internal Server Error';

    let body: { status: number; message: string };

    service.getData().subscribe(
      () => {},
      (error) => {
        body = error;
      }
    );

    const testRequest = controller.expectOne(expectedUrl);
    testRequest.flush({}, { status, statusText });

    expect(body.status).toBe(status);
    expect(body.message).toBe(statusText);
  });
});
