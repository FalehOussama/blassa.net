import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../modules/url/url.module';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  constructor(private http: HttpClient) { }

  private baseUrl = url + "/Location";

  public get(city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/TN/" + city);
  }

  public getDepart(city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/Dep/TN/" + city);
  }

  public getDestination(city: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/Dest/TN/" + city);
  }

}
