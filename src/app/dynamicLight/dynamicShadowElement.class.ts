
import { ElementRef, KeyValueDiffers, SimpleChanges } from '@angular/core';
import { fromEvent, Observable, ReplaySubject, Subscription } from 'rxjs';

import { DynamicShadow } from '../dynamicLight/dynamicShadow.class';
import { LightSourcesService } from '../dynamicLight/lightSource.service';
import { Position } from '../dynamicLight/position.class';
import { IPosition } from '../dynamicLight/position.interface';

export class DynamicShadowElement<T extends HTMLElement> {

  private nativeElement: HTMLButtonElement
  private differ: any;
  private resize$ = fromEvent(window, 'resize')

  private zCoordinate: number = 3
  private position$: ReplaySubject<IPosition> = new ReplaySubject<IPosition>(1)

  private resizeSubscripion: Subscription

  public readonly boxShadow$: Observable<string>

  constructor(el: ElementRef<HTMLButtonElement>, lightSourcesService: LightSourcesService, private differs: KeyValueDiffers) {
    // console.log('zindex ',el.nativeElement.style.zIndex);
    // const z: number = +el.nativeElement.style.zIndex
    this.nativeElement = el.nativeElement
    this.differ = this.differs.find(this.position).create();
    this.boxShadow$ = new DynamicShadow(this.position$, lightSourcesService.lightSources$).boxShadow$
    this.resizeSubscripion = this.resize$.subscribe(() => { this.position$.next(this.position) })
  }

  protected get position(): IPosition {
    // console.log(`zindex ${this.nativeElement.style.zIndex}`);
    return Position.fromDOMRect(this.nativeElement.getBoundingClientRect(), this.zCoordinate)
  }

  protected _ngOnInit(): void {
    this.position$.next(this.position)
    this.differ.diff(this.position);

  }

  protected _ngDoCheck() {
    this.differ.diff(this.position)
  }

  protected _ngOnChanges(changes: SimpleChanges) {
    console.log(JSON.stringify(changes));
    this.position$.next(this.position)
  }

  protected _ngOnDestroy(): void {
    this.resizeSubscripion.unsubscribe()
  }
}
