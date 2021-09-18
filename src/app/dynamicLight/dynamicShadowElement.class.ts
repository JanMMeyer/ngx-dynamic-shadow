
import { Directive, DoCheck, ElementRef, KeyValueDiffers, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { zip } from 'rxjs/operators';
import { DynamicShadow } from '../dynamicLight/dynamicShadow.class';
import { LightSourcesService } from '../dynamicLight/lightSource.service';
import { Position } from '../dynamicLight/position.class';
import { IPosition } from '../dynamicLight/position.interface';

export class DynamicShadowElement<T extends HTMLElement> extends DynamicShadow implements OnChanges, DoCheck, OnInit{

  private nativeElement: HTMLButtonElement 
  private differs: KeyValueDiffers
  private differ: any;
  private zCoordinate: number
  
  constructor(el: ElementRef<HTMLButtonElement>, lightSourcesService: LightSourcesService, differs: KeyValueDiffers) {
    // console.log('zindex ',el.nativeElement.style.zIndex);
    // const z: number = +el.nativeElement.style.zIndex
    const z = 3
    const initialSelfPosition: IPosition = Position.fromDOMRect(el.nativeElement.getBoundingClientRect(), z)
    super(initialSelfPosition, lightSourcesService.lightSources$)
    this.zCoordinate = z
    this.differs = differs
  }


  ngOnInit() {
    this.differ = this.differs.find(this.customer).create(null);
  }
 
    ngDoCheck() {
        console.log('Docheck');
        this.DocheckCount++;
 
        const customerChanges = this.differ.diff(this.customer);
 
        if (customerChanges) {
            console.log(customerChanges);
            customerChanges.forEachChangedItem(r =>  this.changelog.push('changed ' + r.key + ' ' + JSON.stringify( r.currentValue)));
            customerChanges.forEachAddedItem(r =>  this.changelog.push('added ' + r.key + ' ' + JSON.stringify( r.currentValue)));
            customerChanges.forEachRemovedItem(r =>  this.changelog.push('removed ' + r.key + ' ' + JSON.stringify( r.currentValue)));
        }
 
    }
 
    ngOnChanges(changes: SimpleChanges) {
        console.log('OnChanges');
        console.log(JSON.stringify(changes));
 
        // tslint:disable-next-line:forin
        for (const propName in changes) {
             const change = changes[propName];
             const to  = JSON.stringify(change.currentValue);
             const from = JSON.stringify(change.previousValue);
             const changeLog = `${propName}: changed from ${from} to ${to} `;
             this.changelog.push(changeLog);
        }
    }
}