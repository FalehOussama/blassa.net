import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { url } from '../modules/url/url.module';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( 
    private http: HttpClient,
    private token : TokenStorageService,
    ) { }

  private baseUrl = url +  "/Users";
  private baseUrl2 = url + "/commentaires";
  private baseUrl3 = url + "/rating";

  public save(user: User) {
    return this.http.post<User>(this.baseUrl, user);
  }

  public getUserById(id:any): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/" + id );
  }

  public getUserByUid(uid: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/Uid/?Uid=" + uid);
  }

  public getUserMembre(idMembre: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/Membre/?id=" + idMembre);
  }

  public updateUser(user : any) : Observable<any>{
    return this.http.put<any>(this.baseUrl + "/" + user.id , user);
  }

  // old

  public addVehicule(idUser : number , climatise : any , verifie : any, couleur : any , type : any , mis : any , model : any , marque : any , mat : any ) : Observable<any>{
    return this.http.put<any>(this.baseUrl + "/addVehicule/" + idUser, {
       "climatise": climatise,
       "verifie":verifie, 
       "couleur": couleur,
       "type": type,
       "miseEnCirculation": mis,
       "model": model,
       "marque": marque,
       "matricule": mat,
      } 
    )
  }
  public addVehicule2(idUser : number , vehicule:any ) : Observable<any>{
    return this.http.put<any>(this.baseUrl + "/addVehicule/" + idUser, vehicule
    )
  }

  public getCommentaires(idUser:any): Observable<any>{
    return this.http.get<any>(this.baseUrl2 + "/forUser/" + idUser );
  }

  public addCommentaire(commentaire:any[]): Observable<any>{
    return this.http.post<any>(this.baseUrl2 + "/commenter" , commentaire );
  }

  public noterUser(idUser:number, note:number): Observable<any>{
    return this.http.get<any>(this.baseUrl3 + "/noter/" + idUser + "/" + note );
  }
  
}
