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
const local = "http://192.168.1.107:8080";
export var url = local;

