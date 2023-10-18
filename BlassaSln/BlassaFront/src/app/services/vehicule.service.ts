import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicule } from '../classes/vehicule';
import { CouleurType } from "../classes/couleurType";
import { TypeVehiculeType } from "../classes/typeVehiculeType";
import { url } from '../modules/url/url.module';

@Injectable({
  providedIn: 'root'
})

export class VehiculeService {

  constructor(private http: HttpClient)
  { }

  private baseUrl = url + "/Vehicules";

  public getById(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/" + id);
  }

  public getByUserId(uid: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/User/?userId=" + uid);
  }

  public post(vehicule: Vehicule) {
    return this.http.post<Vehicule>(this.baseUrl, vehicule);
  }

  public put(vehicule: Vehicule): Observable<any> {
    return this.http.put<Vehicule>(this.baseUrl + "/" + vehicule.id, vehicule);
  }

  public delete(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + "/" + id);
  }

}
