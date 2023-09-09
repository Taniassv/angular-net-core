import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { apiAuthService } from "../services/api-auth-service";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Login } from "../models/login";

@Component({templateUrl: 'login.component.html'})

export class LoginComponent implements OnInit{
    
    public loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    })  
    
    constructor(public apiAuthService: apiAuthService,
        private router: Router,
        private formBuilder: FormBuilder)
    {
        /*if(this.apiAuthService.systemAccountData){
            this.router.navigate(['/']);
        }*/
    }
    ngOnInit() {
        
    }

    login(){
        console.log(this.loginForm.value);
        this.apiAuthService.loginAuth(this.loginForm.value as Login).subscribe(response => {
            console.log(response);
            this.router.navigate(['/']);
        });
    }
}