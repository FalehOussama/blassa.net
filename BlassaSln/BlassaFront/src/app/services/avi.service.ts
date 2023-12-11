import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../modules/url/url.module';

@Injectable({
  providedIn: 'root'
})

export class AviService {

  constructor(private http: HttpClient) { }

  private baseUrl = url + "/Avis";

  public getById(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/" + id);
  }

  public getByUserId(uid: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/User/?userId=" + uid);
  }

  public getByUserIdPaginate(id: any, page: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/User/" + id + "/" + page);
  }

  public getStat(uid: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/User/Stat/" + uid);
  }

  public post(avi: any) {
    return this.http.post<any>(this.baseUrl, avi);
  }

  public put(avi: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "/" + avi.id, avi);
  }

  public delete(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + "/" + id);
  }

}
