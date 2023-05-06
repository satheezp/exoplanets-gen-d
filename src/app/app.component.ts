import {Component} from '@angular/core';
import {DataService} from './data.service';

interface Planet {
  DiscoveryYear: number;
  RadiusJpt: number;
  PlanetIdentifier: string;
  TypeFlag: number;
  HostStarTempK?: number;
}

interface SizeGroup {
  size: string;
  radiusJpt: number;
  items: Array<{ year: number; count: number }>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  orphanPlanets: number = 0;
  hottestPlanet: string = '';
  sizeGroups: Array<SizeGroup> = [
    {size: 'Small', radiusJpt: 1, items: []},
    {size: 'Medium', radiusJpt: 2, items: []},
    {size: 'Large', radiusJpt: Infinity, items: []},
  ];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getExoplanets().subscribe((planets: Planet[]) => {

      // Count orphan planets
      this.orphanPlanets = planets.filter(planet => planet.TypeFlag === 3).length;

      // Find the planet with highest HostStarTempK value
      let highestHostStarTempK = 0;
      for (let planet of planets) {
        if (planet.HostStarTempK! > highestHostStarTempK) {
          highestHostStarTempK = planet.HostStarTempK!;
          this.hottestPlanet = planet.PlanetIdentifier;
        }
      }

      planets.reduce((result, planet) => {
        if (!planet.RadiusJpt) {
          return result; // skip if radiusJpt is empty
        }

        const sizeGroup = this.sizeGroups.find(
          (g) => planet.RadiusJpt < g.radiusJpt
        );
        const yearGroup = result.find((g) => g.year === planet.DiscoveryYear);

        if (yearGroup) {
          yearGroup.count++;
        } else {
          result.push({
            year: planet.DiscoveryYear,
            count: 1,
          });
        }

        if (sizeGroup) {
          const sizeGroupYear = sizeGroup.items.find((i) => i.year === planet.DiscoveryYear);
          if (sizeGroupYear) {
            sizeGroupYear.count++;
          } else {
            sizeGroup.items.push({year: planet.DiscoveryYear, count: 1});
          }
        }

        return result;
      }, [] as Array<{ year: number; count: number }>);

      this.sizeGroups.forEach((sizeGroup) => {
        sizeGroup.items.sort((a, b) => a.year - b.year);
      });

      console.log(this.sizeGroups);
    });
  }

}
