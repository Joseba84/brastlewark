import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { gnomes } from '../spec-helpers/gnome.spec-helper';

import { GnomeService } from './gnome.service';

fdescribe('GnomeService', () => {
  let service: GnomeService;
  let controller: HttpTestingController;

  const expectedUrl = "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
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
    service.getPopulation().subscribe((res) => {
      expect(res).toEqual(gnomes);
    });

    controller.expectOne(expectedUrl).flush(gnomes);
  });

  it('passes through search errors', () => {
    const status = 500;
    const statusText = 'Internal Server Error';

    let body: { status: number; message: string };

    service.getPopulation().subscribe(
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
