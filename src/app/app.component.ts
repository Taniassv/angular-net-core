import { Component } from '@angular/core';
import { SystemAccount } from './models/systemAccount';
import { Router } from '@angular/router';
import { apiAuthService } from "./services/api-auth-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appCaja';
  user?: SystemAccount;

  constructor(public apiauthService: apiAuthService, private router: Router)
  {
    this.apiauthService.system.subscribe(res =>{
      this.user = res;
      console.log('change ' + res);
    });
  }

  logout(){
    this.apiauthService.logout();
    this.router.navigate(['/login']);
  }
}
