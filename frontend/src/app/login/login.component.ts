// login.component.ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  userPassword: string = '';
  errorMessage: string = ''; // Variable to store error message

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const loginData = {
      userName: this.userName,
      userPassword: this.userPassword
    };

    this.http.post<any>('http://localhost:9090/authenticate', loginData)
      .subscribe(
        response => {
          localStorage.setItem('userRole', response.user.role);
          localStorage.setItem('jwtToken', response.jwtToken);

          this.router.navigate(['/search']);
        },
        error => {
          this.errorMessage = 'Invalid Login Credentials'; // Set error message
          console.log('Authentication failed:', error);
        }
      );
  }
  
}
