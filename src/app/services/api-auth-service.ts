import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {ResponseTania} from "../models/response";
import { SystemAccount } from "../models/systemAccount";
import { map } from "rxjs/operators";
import { Login } from "../models/login";

@Injectable({
    providedIn: 'root'
})

export class apiAuthService{
    //url: string ='https://localhost:44390/api/systemaccount/login';
    url: string ='https://localhost:7107/api/systemaccount/login';

    private systemAccountSubject: BehaviorSubject<SystemAccount>;

    public system: Observable<SystemAccount>;

    public get systemAccountData(): SystemAccount{
        return this.systemAccountSubject.value;
    }

    constructor(private http: HttpClient)
    {
        this.systemAccountSubject = 
        new BehaviorSubject<SystemAccount>(JSON.parse(localStorage.getItem('user2')!));
        this.system = this.systemAccountSubject.asObservable();
    }

    loginAuth(login: Login): Observable<ResponseTania>
    {

        return this.http.post<ResponseTania>(this.url, login).pipe(
            map(res => {
                const user: SystemAccount = res.data;
                localStorage.setItem('user2', JSON.stringify(user));
                this.systemAccountSubject.next(user);
                return res;
            })
        );
    }

    logout()
    {
        localStorage.removeItem('user2');
        this.systemAccountSubject.next(null!);
    }
}