import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


export interface Profile {
  id?: number;
  phoneNumber: string;
  address: string;
  birthDate: string;
  gender: string;
  bio: string;
  picture?: string;
  userId?: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8222'; // adapte si nécessaire

  constructor(private http: HttpClient) {}


  showUserDetails(userId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile/user/find-id/${userId}`);
  }


  updateUserDetails(userId: string, profileData: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/profile/user/${userId}`, profileData);
  }
}
