import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livraison } from '../models/livraison.model';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  private apiUrl = 'http://localhost:8087/api/livraisons';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  get(id: number): Observable<Livraison> {
    return this.http.get<Livraison>(`${this.apiUrl}/${id}`);
  }

  create(livraison: Livraison): Observable<Livraison> {
    return this.http.post<Livraison>(`${this.apiUrl}/create`, livraison);
  }

  update(id: number, livraison: Livraison): Observable<Livraison> {
    return this.http.put<Livraison>(`${this.apiUrl}/update/${id}`, livraison);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ New method to mark livraison as Livrée
  markAsLivree(id: number): Observable<Livraison> {
    return this.http.put<Livraison>(`${this.apiUrl}/${id}/mark-as-livree`, {});
  }
  exportToPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/pdf`, {
      responseType: 'blob' // important for downloading binary data
    });
  }
  getAllLivreurs(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8087/api/livreurs');
  }
  
  assignLivreur(livraisonId: number, livreurId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${livraisonId}/assign/${livreurId}`, {});
  }
  
}
