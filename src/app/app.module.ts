import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DynamicButtonShadow } from './dynamicLight/dynamicShadow.directive';
import { DraggableLight } from './dynamicLight/draggableLight.component';

@NgModule({
  imports: [BrowserModule, FormsModule, DragDropModule],
  declarations: [AppComponent, DynamicButtonShadow, DraggableLight],
  bootstrap: [AppComponent]
})
export class AppModule {}
