import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { DraggableLight } from './dynamicLight/draggableLight.component';
import { DynamicShadowButton } from './dynamicLight/dynamicShadow.directive';

@NgModule({
  imports: [BrowserModule, FormsModule, DragDropModule],
  declarations: [AppComponent, DynamicShadowButton, DraggableLight],
  bootstrap: [AppComponent]
})
export class AppModule { }
