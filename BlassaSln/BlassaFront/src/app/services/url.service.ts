import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  private recette="https://blassabackend.ew.r.appspot.com"

  public url = this.recette;
}
