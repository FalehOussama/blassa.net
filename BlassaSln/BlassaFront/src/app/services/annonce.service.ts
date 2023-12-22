import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../modules/url/url.module';
import { StorageService } from './storage.service';
import { TrajetAnnonceCriteresDto } from '../classes/trajetAnnonceCriteresDto';
import { TrajetAnnonceTriTypeDto } from '../classes/trajetAnnonceTriTypeDto';
import { TrajetsAnnoncesRechercheRetourDto } from '../classes/trajetsAnnoncesRechercheRetourDto';
import { TrajetAnnonce } from '../classes/trajetAnnonce';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  
  constructor(
    private http: HttpClient ,
    private storage : StorageService,
    ) { 
    }
  private baseUrl = url + "/TrajetsAnnonces";

  public post(trajetAnnonce: TrajetAnnonce) {
    return this.http.post<TrajetAnnonce>(this.baseUrl, trajetAnnonce);
  }

  trajetsAnnoncesRecherchePost(crietres: TrajetAnnonceCriteresDto, tri: TrajetAnnonceTriTypeDto, pageNb: number) {
    return this.http.post<TrajetsAnnoncesRechercheRetourDto>(this.baseUrl + "/Recherche/?tri=" + tri + "&pageNb=" + pageNb, crietres);
  }

  getTrajetAnnonceById(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/" + id);
  }

  getMesTrajetsByUserId(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/User/" + id);
  }

  getMesTrajetsHisByUserId(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/UserHis/" + id);
  }

  getMesTrajetsResByUserId(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/UserReservation/" + id);
  }

  getMesTrajetsResHisByUserId(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/UserReservationHis/" + id);
  }

  getPrixMoyen(depart: string, destination: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/PrixMoyen/" + depart + "/" + destination);
  }

}
