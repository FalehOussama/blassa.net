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

  //================================

  getAnnonces(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}` + "/allAnnonces");
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + "/pag/annonces", { params });
  }

  getAnnonceById(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/" + id);
  }

  rechercher(iduser:any , dep:any , des:any  , np:any , date:any) : Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + "/Annonces/rechercher/" + iduser+ "/"+ dep +"/" + des +"/" + np +"/" + date);
  }
  rechercher2(dep:any , des:any  , np:any , date:any) : Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + "/Annonces/rechercherHis/" + dep +"/" + des +"/" + np +"/" + date);
  }


  public saveAnnonce(prix : any ,depart :any ,destination : any ,lonDes : any , lonDep : any , latDes : any , latDep : any, id_User :any ,
    date : any , nbrP : any ,climatisation:any , lourd :any , moyen : any , leger : any , cig : any , max2 : any , animal : any  , inst:any ,vehicule:any,filles:any , garcons:any , tous:any , pv:any , user:any  ) {
    return this.http.post<any>(this.baseUrl + '/addAnnonce',{
      "trajet" : { depart , destination , lonDes , lonDep , latDes , latDep}, 
      "vehicule":vehicule,
      "reservations":[],
      "prix" : prix,
      "nombrePlaces":nbrP,
      "climatisation":climatisation,
      "lourd":lourd,
      "moyen":moyen,
      "leger":leger,
      "animal":animal,
      "cigarette": cig,
      "max2":max2,
      "inst": inst,
      "conducteur": user,
      "date_Heure_Depart": date,
      "iduser":id_User,
      "filles":filles,
      "garcons":garcons,
      "tous":tous,
      "profilVerife":pv
    });
  }

}
