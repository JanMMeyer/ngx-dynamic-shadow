import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LightSourcesService } from '../dynamicLight/lightSource.service';
import { Position } from '../dynamicLight/position.class';
import { IPosition } from '../dynamicLight/position.interface';

@Component({
  selector: 'draggableLight',
  template: `<div class="draggable" cdkDrag
              (cdkDragMoved)="handleDrag($event)" >
                Drag me!
            </div>
            <div class="lights-wrapper">
              <ng-content></ng-content>
            </div>
            <svg height="0"> <defs>
              <filter id="shinyFilter">
                <!-- <feSpecularLighting id="spec" result="lightOut"
                    specularExponent="8" lighting-color="#bbbbbb">
                  <fePointLight *ngFor="let lightSource of (lightSources$ | async)"
                    [attr.x]="lightSource.x"
                    [attr.y]="lightSource.y"
                    [attr.z]="lightSource.z"/>
                </feSpecularLighting> -->
                <feDiffuseLighting  id="spec" result="lightOut"
                    surfaceScale="1"
                    diffuseConstant="0.02"
                    lighting-color="magenta">
                  <fePointLight *ngFor="let lightSource of (lightSources$ | async)"
                    [attr.x]="lightSource.x"
                    [attr.y]="lightSource.y"
                    [attr.z]="lightSource.z"/>
                </feDiffuseLighting>
                <feComposite in="SourceGraphic" in2="lightOut"
                    operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
              </filter>
            </defs> </svg>
            `,
  styles: [
    `.draggable {
      cursor: move;
      z-index: 10;
      top: 0;
      left: 0;
      position: absolute;
      padding: 0.5em;
    }`,
    `.lights-wrapper {
      position: absolute;
      top: 0;
      right:0;
      bottom: 0;
      left:0;
      filter:url(#shinyFilter);
      z-index: 1;
    }`
  ],
})
export class DraggableLight {
  private nativeElement: HTMLButtonElement
  private z: number = 200
  private lightSourceIndex: number

  public lightSources$: Observable<IPosition[]>

  constructor(el: ElementRef<HTMLButtonElement>, public lightSourcesService: LightSourcesService) {
    this.nativeElement = el.nativeElement
    const position: IPosition = Position.fromDOMRect(this.nativeElement.getBoundingClientRect(), this.z)
    this.lightSourceIndex = this.lightSourcesService.registerLightSource(position)
    this.lightSources$ = this.lightSourcesService.lightSources$
  }

  public handleDrag(event: unknown) {
    const position: IPosition = Position.fromDragMovedEvent(event as CdkDragMove<HTMLElement>, this.z)
    this.lightSourcesService.updateLightSource(this.lightSourceIndex, position)
  }
}
