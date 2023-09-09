import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { apiAuthService } from "../services/api-auth-service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    
    constructor ( private router: Router,
                  private apiAuthService: apiAuthService){}
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const user = this.apiAuthService.systemAccountData;
        if(user)
        {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
    
}