import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiAuthService } from "../services/api-auth-service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
    constructor(private apiAuthService: apiAuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.apiAuthService.systemAccountData;
        if(user)
        {
            req = req.clone({
                setHeaders:{
                    Authorization: `Bearer ${user.token}`
                }
            });
        }  
        return next.handle(req); 
    }
}