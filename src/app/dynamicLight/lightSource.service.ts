import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, Observable } from "rxjs";
import { IPosition } from "../dynamicLight/position.interface";

@Injectable({providedIn: 'root'})
export class LightSourcesService {
  private _lightSources$: BehaviorSubject<IPosition[]> = new BehaviorSubject<IPosition[]>([])
  public lightSources$: Observable<IPosition[]> = this._lightSources$.asObservable()


  constructor() {
    // const initialLightSource: IPosition = { x: 600, y: 1, z: 100 };
    // const initialLightSourceIndex: number = this.registerLightSource(initialLightSource)
    //this.registerLightSource({ x: 400, y: 200, z: 100 })
    // interval(100).subscribe((tick: number) => {
    //   const i = tick;
      
    //   const movedLightSource = {
    //     x: initialLightSource.x + i * -10,
    //     y: initialLightSource.y + i * 10,
    //     z: initialLightSource.z
    //   };
    //   this.updateLightSource(initialLightSourceIndex, movedLightSource)
    // })
  }

  public get lightSources(): IPosition[] {
    return this._lightSources$.value
  }
  public registerLightSource(lightSource: IPosition): number {
    const nextLightSources = [...this.lightSources]
    console.log(nextLightSources)
    const index = nextLightSources.push(lightSource) - 1
    console.log(nextLightSources)
    this._lightSources$.next(nextLightSources)
    return index
  }

  public updateLightSource(index: number, lightSource: Partial<IPosition>): void {
    const nextLightSources = [...this.lightSources]
    const nextLightSource = nextLightSources[index]
    if (!nextLightSource) {
      console.error('invalid index')
      return
    } 
    Object.assign(nextLightSource, lightSource)
    this._lightSources$.next(nextLightSources)
  }

  public removeLightSource(index: number): void {
    if (!this.lightSources[index]) {
      console.error('invalid index')
      return
    } 
    const nextLightSources = this.lightSources.splice(index,1)
     this._lightSources$.next(nextLightSources)
  }
}