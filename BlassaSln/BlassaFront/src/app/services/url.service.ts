import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  private recette = "https://blassabackend.ew.r.appspot.com"

  private local = "https://localhost:7245/api"

  public url = this.local;
}
