import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import {ResponseTania  } from '../models/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiCompanyService {

  /*url: string = 'https://localhost:44390/api/company';*/
  url: string = 'https://localhost:7107/api/company';

  constructor(
    private http:HttpClient
  ) { }

  getCompanys(): Observable<ResponseTania> {
    return this.http.get<ResponseTania>(this.url);
  }

  addCompanies(company: Company):Observable<Response>{
    return this.http.post<Response>(this.url, company, httpOption);
  }
  editCompanies(company: Company):Observable<Response>{
    return this.http.put<Response>(this.url, company, httpOption);
  }
  deleteCompanies(id: number):Observable<Response>{
    console.log(id);
    return this.http.delete<Response>(`${this.url}/${id}`);
  }

  //async getRootCategories(): Promise<ResponseTania[]> {
    //const url = this.parameterService.createFilingTypeUrl("categories-root");
    //return this._http.get<ResponseTania>(this.url).toPromise();
  //}
}
