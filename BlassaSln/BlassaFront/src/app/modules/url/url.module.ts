import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UrlModule { }

const recette="https://blassabackend.ew.r.appspot.com";
const local = "https://localhost:7245/api";
export var url = local;

