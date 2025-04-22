import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8222/api/prod/products/';

  constructor(private http: HttpClient) {}

  // Ajouter un produit
  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  // Obtenir tous les produits
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtenir un produit par ID
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }

  // Mettre à jour un produit
  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting product:', error);
        return throwError(() => new Error('Failed to delete product'));
      })
    );
  }

  // Obtenir les produits par catégorie
  getProductsByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}category/${categoryId}`);
  }



  addProductWithImage(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8222/api/prod/products/with-image', formData);
  }
  updateProductWithImage(formData: FormData): Observable<any> {
    return this.http.put(`http://localhost:8222/api/prod/products`, formData);
  }

}
