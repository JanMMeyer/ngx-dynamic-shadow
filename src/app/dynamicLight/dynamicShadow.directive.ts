import { Directive, DoCheck, ElementRef, KeyValueDiffers, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DynamicShadowElement } from '../dynamicLight/dynamicShadowElement.class';
import { LightSourcesService } from './lightSource.service';

@Directive({
  selector: 'button',
  host: {
    '[style.box-shadow]': 'boxShadow',
  }
})
export class DynamicShadowButton extends DynamicShadowElement<HTMLButtonElement> implements DoCheck, OnChanges, OnInit, OnDestroy {

  public boxShadow: string | null = null

  private shadowSubscription: Subscription

  constructor(el: ElementRef<HTMLButtonElement>, lightSourcesService: LightSourcesService, differs: KeyValueDiffers) {
    super(el, lightSourcesService, differs)
    this.shadowSubscription = this.boxShadow$.subscribe((boxShadow) => {
      this.boxShadow = boxShadow
    })
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
