import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number,
  name: string;
  brand: string;
  productCode: string;
  productImage: string;
  price: number;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  id: number = 0;
  name: string = '';
  brand: string = '';
  productCode: string = '';
  products: Product[] = []; // Array to store the search results
  errorMessage: string = '';
  maxPrice: number | null = null;
  price: number | null = null;
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.searchProducts();
  }


  // Search for products based on the provided search criteria
  searchProducts(): void {
    let url: string = 'http://localhost:9090/search?';
    if (this.productCode !== null && this.productCode !== '')
      url += '&productCode=' + this.productCode;
    if (this.name !== null && this.name !== '')
      url += '&name=' + this.name;
    if (this.brand !== null && this.brand !== '')
      url += '&brand=' + this.brand;
    console.log(url);

    this.http.get<any>(url)
      .subscribe(
        response => {
          // Handle the API response
          console.log('Search results:', response);
          this.products = response; // Set the search results to the products array

          // Filter products based on the maximum price, if provided
          if (this.maxPrice !== null) {
            this.products = this.products.filter(product => product.price <= this.maxPrice!);
          } else {
            this.products = this.products;
          }
        },
        error => {
          // Handle the API error
          console.log('Search failed:', error);
          // Further error handling
        }
      );
  }

  // View the details of a specific product
  viewProduct(productId: any): void {
    console.log(productId+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.router.navigate(['/product', productId]);
  }

  // Checks if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken') && !!localStorage.getItem('userRole');
  }

}
