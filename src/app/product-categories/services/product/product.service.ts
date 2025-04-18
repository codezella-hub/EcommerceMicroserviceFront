import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // Supprimer un produit
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

  // Obtenir les produits par catégorie
  getProductsByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}category/${categoryId}`);
  }

  
  
  addProductWithImage(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8222/api/prod/products/with-image', formData);
  }
  
}
