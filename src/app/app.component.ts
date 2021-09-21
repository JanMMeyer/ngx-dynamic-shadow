import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPosition } from './dynamicLight/position.interface'
import { LightSourcesService } from './dynamicLight/lightSource.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public lightSources$: Observable<IPosition>

  constructor(lightSourcesService: LightSourcesService) {
    this.lightSources$ = lightSourcesService.lightSources$.pipe(map(sources => sources[0]))
    // document.getElementById("spec").setStdDeviation(5, 5);
  }
}
