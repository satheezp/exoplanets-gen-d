import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve exoplanets data from the API via GET', () => {
    const mockData = [
      { DiscoveryYear: 1995, RadiusJpt: 0.867, PlanetIdentifier: '11 Com b', TypeFlag: 1, HostStarTempK: 4742 },
      { DiscoveryYear: 1996, RadiusJpt: 1.527, PlanetIdentifier: '14 Her b', TypeFlag: 0 },
      { DiscoveryYear: 1996, RadiusJpt: 1.056, PlanetIdentifier: '14 Her c', TypeFlag: 0 },
      { DiscoveryYear: 2004, RadiusJpt: 0.885, PlanetIdentifier: '16 Cyg B b', TypeFlag: 0, HostStarTempK: 5750 },
      { DiscoveryYear: 2007, RadiusJpt: 1.867, PlanetIdentifier: '16 Cyg B c', TypeFlag: 0, HostStarTempK: 5750 }
    ];

    service.getExoplanets().subscribe((data) => {
      expect(data.length).toBe(5);
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
