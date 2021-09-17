import {Component, ElementRef} from '@angular/core';
import { LightSourcesService } from '../dynamicLight/lightSource.service';
import { Position } from '../dynamicLight/position.class';
import { IPosition } from '../dynamicLight/position.interface';

export interface DragMovedEvent {
  pointerPosition: { x: number, y: number }
}

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
                <feSpecularLighting id="spec" result="specOut"
                    specularExponent="20" lighting-color="#bbbbbb">
                  <fePointLight x="75" y="75" z="200"/>
                </feSpecularLighting>
                <feComposite in="SourceGraphic" in2="specOut"
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
    }`,
    // `div {

    // }`
  ],
})
export class DraggableLight {
  private nativeElement: HTMLButtonElement
  private z: number = 100
  private lightSourceIndex: number
  
  constructor(el: ElementRef<HTMLButtonElement>, private lightSourcesService: LightSourcesService) {
    this.nativeElement = el.nativeElement
    const position: IPosition = Position.fromDOMRect(this.nativeElement.getBoundingClientRect(), this.z)
    this.lightSourceIndex = this.lightSourcesService.registerLightSource(position)
  }

  public handleDrag(event: DragMovedEvent) {
    const position: IPosition = Position.fromDragMovedEvent(event, this.z)
    this.lightSourcesService.updateLightSource(this.lightSourceIndex, position)
  }
}