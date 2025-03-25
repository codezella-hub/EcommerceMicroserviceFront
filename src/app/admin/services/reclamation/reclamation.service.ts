import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reclamation } from 'src/app/models/reclamation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  apiUrlReclamations : string = "http://localhost:8085/reclamations";
  constructor(private http: HttpClient) { }

  getListReclamationsFromBackend() : Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrlReclamations);
  }

  deleteReclamationById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlReclamations}/${id}`);
  }

  updateReclamationById(id: number, reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrlReclamations}/${id}`, reclamation);
  }
  
  addReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.apiUrlReclamations, reclamation);
  }
  
  
}
