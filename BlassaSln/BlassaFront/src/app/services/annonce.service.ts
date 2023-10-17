import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { url } from '../modules/url/url.module';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  
  constructor(
    private http: HttpClient ,
    private token : TokenStorageService,
    private storage : StorageService,
    ) { 
    }
    private baseUrl = url +  "/annonce";


  getAnnonces(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}` + "/allAnnonces");
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + "/pag/annonces", { params });
  }

  getAnnonceById(id:any) : Observable<any>{
    return this.http.get<any>(this.baseUrl + "/" + id );
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
