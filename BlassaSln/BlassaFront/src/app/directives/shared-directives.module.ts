import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParralaxHeaderDirective } from './parralax-header.directive';



@NgModule({
  declarations: [
    ParralaxHeaderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ParralaxHeaderDirective]
})
export class SharedDirectivesModule { }
