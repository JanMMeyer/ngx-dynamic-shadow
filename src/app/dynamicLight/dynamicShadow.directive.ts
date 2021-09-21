import { Directive, DoCheck, ElementRef, KeyValueDiffers, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DynamicShadowElement } from '../dynamicLight/dynamicShadowElement.class';
import { LightSourcesService } from './lightSource.service';

@Directive({
  selector: 'button',
  host: {
    '[style.box-shadow]': 'boxShadow',
    '(focus)': 'onFocus($event)',
    '(blur)': 'onBlur($event)',
    //'(mouseover)': 'onHover($event)'
  }
})
export class DynamicShadowButton extends DynamicShadowElement<HTMLButtonElement> implements DoCheck, OnChanges, OnInit, OnDestroy {

  public boxShadow: string | null = null

  private shadowSubscription: Subscription
  private focusLightSourceIndex: number | null = null

  constructor(el: ElementRef<HTMLButtonElement>, private lightSourcesService: LightSourcesService, differs: KeyValueDiffers) {
    super(el, lightSourcesService, differs)
    this.shadowSubscription = this.boxShadow$.subscribe((boxShadow) => {
      this.boxShadow = boxShadow
    })
  }

  public onFocus(event: FocusEvent) {
    console.log(event)
    this.focusLightSourceIndex = this.lightSourcesService.registerLightSource(this.position)
  }

  public onBlur(event: FocusEvent) {
    console.log(event)
    if (typeof this.focusLightSourceIndex === 'number') this.lightSourcesService.removeLightSource(this.focusLightSourceIndex)
  }

  public onHover(event: MouseEvent) {
    console.log(event)
    //this.focusLightSourceIndex = this.lightSourcesService.registerLightSource(this.position)
  }

  public ngOnInit(): void {
    this._ngOnInit()
  }

  public ngDoCheck(): void {
    this._ngDoCheck()
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._ngOnChanges(changes)
  }

  public ngOnDestroy(): void {
    this._ngOnDestroy()
    this.shadowSubscription.unsubscribe()
  }

}
