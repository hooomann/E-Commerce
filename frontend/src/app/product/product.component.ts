import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: any;
  pincode: string = '';
  pincodeMessage: string = '';
  id: any ;

  constructor(private route: ActivatedRoute,private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Get the product details from the history state
    // this.product = history.state.product;
    this.showProduct();

  }

  showProduct(): void{
    this.id = this.route.snapshot.paramMap.get('productId');
    const token = localStorage.getItem('jwtToken'); // Get the JWT token from local storage
    const headers = { Authorization: `Bearer ${token}` };
    console.log(token);
    // Make the API call to check the product deliverability
    const url = "http://localhost:9090/product/"+this.id;
    console.log(url);
    this.http.get<any>(url, { headers })
      .subscribe(
        response => {
          // Handle the API response
          console.log('Get Product response:', response);
          this.product=response;
        },
        error => {
          // Handle the API error
          console.log('Pincode check failed:', error);
          // Further error handling
          this.router.navigate(['/search']);
        }
      );
    
  }
  // Check the deliverability of the product based on the pincode
  checkPincode(): void {


    const token = localStorage.getItem('jwtToken'); // Get the JWT token from local storage
    const headers = { Authorization: `Bearer ${token}` };
    console.log(token);

    // Make the API call to check the product deliverability
    const url = `http://localhost:9090/serviceable?productId=${this.product.id}&pincode=${this.pincode}`;
    this.http.get<any>(url, { headers })
      .subscribe(
        response => {
          // Handle the API response
          console.log('Pincode check response:', response);
          this.pincodeMessage = "Yes, the product is deliverable at your location! ORDER NOW"; // Set the pincode message
        },
        error => {
          // Handle the API error
          console.log('Pincode check failed:', error);
          // Further error handling
          this.pincodeMessage = "No, the product is not deliverable at your location!";
        }
      );
  }
  

    // Checks if the user is logged in
    isLoggedIn(): boolean {
      return !!localStorage.getItem('jwtToken') && !!localStorage.getItem('userRole');
    }
    
}
