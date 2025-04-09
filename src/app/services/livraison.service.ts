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

  /**
   * Fetch all livraisons from backend
   */
  getAll(): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(this.apiUrl);
  }

  /**
   * Fetch a single livraison by its ID
   * @param id ID of the livraison
   */
  get(id: number): Observable<Livraison> {
    return this.http.get<Livraison>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new livraison
   * @param livraison Livraison data
   */
  create(livraison: Livraison): Observable<Livraison> {
    return this.http.post<Livraison>(`${this.apiUrl}/create`, livraison);
  }

  /**
   * Update an existing livraison by ID
   * @param id Livraison ID
   * @param livraison Updated livraison data
   */
  update(id: number, livraison: Livraison): Observable<Livraison> {
    return this.http.put<Livraison>(`${this.apiUrl}/update/${id}`, livraison);
  }

  /**
   * Delete a livraison by its ID
   * @param id Livraison ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
