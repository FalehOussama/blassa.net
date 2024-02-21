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
  ) {
  }

  private baseUrl = url +  "/Users";
  private httpOptions = {
    headers: { 'Access-Control-Allow-Origin': '_blassaOrigins' }
  };

  public save(user: User) {
    return this.http.post<User>(this.baseUrl, user, this.httpOptions);
  }

  public getUserById(id:any): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/" + id, this.httpOptions );
  }

  public getUserByUid(uid: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/Uid/?Uid=" + uid, this.httpOptions);
  }

  public getUserMembre(idMembre: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/Membre/?id=" + idMembre, this.httpOptions);
  }

  public updateUser(user : any) : Observable<any>{
    return this.http.put<any>(this.baseUrl + "/" + user.id, user, this.httpOptions);
  }
  
}
