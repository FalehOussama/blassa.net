import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnonceStorageService {

  constructor() { }

  public annonce : any;
  public annonces : any[];
  recherche : any[] = [];

  dep:any;
  des:any;
  lat1:any;
  lat2:any;
  lng1:any;
  lng2:any;
}
