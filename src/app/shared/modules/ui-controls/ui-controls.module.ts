import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ExpandableComponent } from './expandable/expandable.component';
import { StepperComponent } from './stepper/stepper.component';



@NgModule({
  declarations: [ExpandableComponent, StepperComponent],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports:[
    ExpandableComponent,
    StepperComponent
  ]
})
export class UiControlsModule { }
