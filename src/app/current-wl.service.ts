import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, raceWith } from 'rxjs';
import { StatsWl } from './current-wl/stats-wl-model';

@Injectable({
  providedIn: 'root'
})
export class CurrentWlService {
  private apiUrl = 'https://localhost:7136/api';

  constructor(private http : HttpClient) { }

  getJogadoresByWl(id_wl:number):Observable<any>{
     return this.http.get<any>(`${this.apiUrl}/jogador/getJogadoresByWl/${id_wl}`);
    }


    getWlById(id_wl:number):Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/weekendLeague/getWlById/${id_wl}`);
      
    }
  
  }


