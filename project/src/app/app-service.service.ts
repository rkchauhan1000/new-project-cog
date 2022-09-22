import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from 'src/app/Offer';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http : HttpClient) { }

  getData(){
    return this.http.get('/api/getOffers')
  }

  updateData(offers : Array<Offer>){
    return this.http.post('/api/updateOffers',offers)
  }
}
