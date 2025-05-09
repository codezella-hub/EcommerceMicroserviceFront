// src/app/service/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;

}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8222/api/prod/products';

  constructor(private http: HttpClient) {}

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8222/api/cart/send-product/${id}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/`);
  }
}
