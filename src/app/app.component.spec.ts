import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppComponent} from './app.component';
import {DataService} from './data.service';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [DataService],
    }).compileComponents();
  });

  beforeEach(() => {
    dataService = TestBed.inject(DataService);
    spyOn(dataService, 'getExoplanets').and.returnValue(
      of([
        {
          DiscoveryYear: 2015,
          RadiusJpt: 0.2,
          PlanetIdentifier: 'Kepler-1234b',
          TypeFlag: 1,
          HostStarTempK: 5000,
        },
        {
          DiscoveryYear: 2015,
          RadiusJpt: 1.5,
          PlanetIdentifier: 'Kepler-1234c',
          TypeFlag: 2,
          HostStarTempK: 6000,
        },
        {
          DiscoveryYear: 2015,
          RadiusJpt: 0.9,
          PlanetIdentifier: 'Kepler-1234d',
          TypeFlag: 1,
          HostStarTempK: 7000,
        },
        {
          DiscoveryYear: 2015,
          RadiusJpt: 2.1,
          PlanetIdentifier: 'Kepler-1234e',
          TypeFlag: 2,
          HostStarTempK: 8000,
        },
        {
          DiscoveryYear: 2015,
          RadiusJpt: 3.8,
          PlanetIdentifier: 'Kepler-1234f',
          TypeFlag: 3,
          HostStarTempK: 9000,
        },
      ])
    );
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should group planets by size and year correctly', () => {
    expect(component.sizeGroups[0].items).toEqual([
      {year: 2015, count: 2},
    ]);
    expect(component.sizeGroups[1].items).toEqual([
      {year: 2015, count: 1},
    ]);
    expect(component.sizeGroups[2].items).toEqual([
      {year: 2015, count: 2},
    ]);
  });

  it('should count orphan planets correctly', () => {
    expect(component.orphanPlanets).toBe(1);
  });

  it('should find the hottest planet correctly', () => {
    // test the method that uses the spy
    expect(component.hottestPlanet).toBe('Kepler-1234f');
  });


});

