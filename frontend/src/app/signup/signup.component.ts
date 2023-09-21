import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userName: string = '';
  userFirstName: string = '';
  userLastName: string = '';
  userPassword: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Perform user registration
  signup(signupForm: any): void {
    const newUser = {
      userName: this.userName,
      userFirstName: this.userFirstName,
      userLastName: this.userLastName,
      userPassword: this.userPassword
    };

    this.http.post<any>('http://localhost:9090/registerNewUser', newUser)
      .subscribe(
        response => {
          // Handle successful registration, such as displaying a success message
          if (response === null) {
            this.message = "Username already taken!";
            return;
          }
          console.log('User registered successfully:', response);
          this.message = 'User registered successfully!';
          this.router.navigate(['/login']);
        },
        error => {
          // Handle registration error, such as displaying an error message
          console.log('User registration failed:', error);
          this.message = 'User registration failed.';
        }
      );
  }

  // Navigate back to the home page
  goBack(): void {
    this.router.navigate(['']);
  }
}
