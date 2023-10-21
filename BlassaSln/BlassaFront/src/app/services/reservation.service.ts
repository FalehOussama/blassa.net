import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../modules/url/url.module';

type User = {
  id_User: any;
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  

  

  constructor( 
    private http: HttpClient
    ) { }
  private baseUrl = url + "/Reservations";

  // new
  public putReservation(reservation: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "/" + reservation.id, reservation);
  }


  // old
  public save(id_Annonce : any , id_User : any) : Observable<any> {
    const user: User = {
      id_User: 0,
    };
    user.id_User = id_User;
    return this.http.post<any>(this.baseUrl+ '/reservationManuelle' , {id_Annonce , user});
  }

  public saveInst(id_Annonce : any , id_User : any) : Observable<any> {
    const user: User = {
      id_User: 0,
    };
    user.id_User = id_User;
    return this.http.post<any>(this.baseUrl+ '/reservationInst' , {id_Annonce , user});
  }

  getAnnonceReservationUsers(id:any): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + "/annonce/users/" + id );
  }

  public confirmerReservation(id : any) : Observable<any>{
    return this.http.put<any>(this.baseUrl + "/accepter/" + id , null);
  }
  public refuserReservation(id : any) : Observable<any>{
    return this.http.put<any>(this.baseUrl + "/refuser/" + id , null);
  }

  public getMesReservations(idUser:any): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/mesReservations/" + idUser );
  }

  public getMesAnnonces(idUser:any): Observable<any>{
    return this.http.get<any>(this.baseUrl + "/mesAnnonces/" + idUser );
  }


  
}
