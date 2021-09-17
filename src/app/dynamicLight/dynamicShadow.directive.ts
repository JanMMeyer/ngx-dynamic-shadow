import { Directive, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicShadow } from '../dynamicLight/dynamicShadow.class';
import { LightSourcesService } from '../dynamicLight/lightSource.service';
import { Position } from '../dynamicLight/position.class';
import { IPosition } from '../dynamicLight/position.interface';

@Directive({
  selector: 'button',
  host: {
    '[style.box-shadow]': 'boxShadow',
  }
})
export class DynamicButtonShadow extends DynamicShadow {
  constructor(el: ElementRef<HTMLButtonElement>, lightSourcesService: LightSourcesService) {
    // console.log('zindex ',el.nativeElement.style.zIndex);
    // const z: number = +el.nativeElement.style.zIndex
    const z = 3
    const selfPosition: IPosition = Position.fromDOMRect(el.nativeElement.getBoundingClientRect(), z)
    const lightSources$: Observable<IPosition[]> = lightSourcesService.lightSources$
    super(selfPosition, lightSources$);
  }
}