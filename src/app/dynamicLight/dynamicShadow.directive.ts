import { Directive } from '@angular/core';
import { DynamicShadowElement } from '../dynamicLight/dynamicShadowElement.class';

@Directive({
  selector: 'button',
  host: {
    '[style.box-shadow]': 'boxShadow',
  }
})
export class DynamicShadowButton extends DynamicShadowElement<HTMLButtonElement> {}