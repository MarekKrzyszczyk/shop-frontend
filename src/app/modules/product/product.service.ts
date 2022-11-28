import {Injectable} from '@angular/core';
import {Product} from "./model/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {
  }

  getProducts(): Product[] {
    return [
      {
        name: "Product 1",
        category: "Category 1",
        description: "Description 1",
        price: 10.99,
        currency: "PLN"
      },
      {
        name: "Product 3",
        category: "Category 3",
        description: "Description 3",
        price: 40.99,
        currency: "PLN"
      },
      {
        name: "Product 2",
        category: "Category 2",
        description: "Description 2",
        price: 30.99,
        currency: "PLN"
      }
    ];
  }
}
