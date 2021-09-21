import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPosition } from "../dynamicLight/position.interface";

export class DynamicShadow {
  public boxShadow$: Observable<string>

  constructor(
    selfPosition$: Observable<IPosition>,
    lightSources$: Observable<IPosition[]>
  ) {
    this.boxShadow$ = combineLatest([selfPosition$, lightSources$]).pipe(
      map(([selfPosition, lightSources]: [IPosition, IPosition[]]) => {
        const alpha: number = 1 / lightSources.length
        return lightSources.map((lightSource) => this.getBoxShadow(selfPosition, lightSource, alpha))
          .join(',')
        // console.log(this.boxShadow)
      }))
  }

  private getBoxShadow(selfPosition: IPosition, lightSource: IPosition, alpha: number = 1): string {
    // console.log(`self position: ${this.selfPosition.x}, ${this.selfPosition.y}, ${this.selfPosition.z}`)
    // console.log(`lightSource: ${lightSource.x}, ${lightSource.y}, ${lightSource.z}`)

    const dx = lightSource.x - selfPosition.x
    const dy = lightSource.y - selfPosition.y
    const dz = lightSource.z - selfPosition.z
    // console.log(`dx: ${dx}, dy: ${dy}, dz: ${dz}`)

    let Sx = Math.round(-1 * dx * selfPosition.z / (dz ? dz : 1))
    let Sy = Math.round(-1 * dy * selfPosition.z / (dz ? dz : 1))
    Sx = Sx ? Sx : 1
    Sy = Sy ? Sy : 1
    // console.log(`Sx: ${Sx}, Sy: ${Sy}`)

    const boxShadow = `${Sx}px ${Sy}px 1px 0.5px rgba(0, 0, 0, ${alpha})`;
    // console.log(`boxShadow ${boxShadow}`)
    // console.log('                       ')
    return boxShadow
  }
}
