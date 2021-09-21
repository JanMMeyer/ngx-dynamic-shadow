import { CdkDragMove } from "@angular/cdk/drag-drop";
import { IPosition } from "../dynamicLight/position.interface";


export class Position implements IPosition {

  public static fromDOMRect(domRect: DOMRect, z: number) {
    const x: number = domRect.x + (domRect.width + 1) / 2
    const y: number = domRect.y + (domRect.height + 1) / 2
    return new Position(x, y, z)
  }

  public static fromDragMovedEvent(dragMovedEvent: CdkDragMove<HTMLElement>, z: number) {
    const x: number = dragMovedEvent.pointerPosition.x
    const y: number = dragMovedEvent.pointerPosition.y
    return new Position(x, y, z)
  }

  constructor(public x: number, public y: number, public z: number) { }

}
