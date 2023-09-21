import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Checks if the user is logged in by verifying the presence of 'jwtToken' and 'userRole' in localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken') && !!localStorage.getItem('userRole');
  }

  // Logs out the user by clearing the localStorage
  logout(): void {
    localStorage.clear();
  }
  
}
