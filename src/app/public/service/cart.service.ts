import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../entities/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = '/api/cart';  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: false  
  };

  constructor(private http: HttpClient) { }

  // Get cart by user ID
  getCartByUserId(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${userId}`, this.httpOptions);
  }

  // Get cart total
  getCartTotal(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${userId}/total`, this.httpOptions);
  }

  // Add item to cart
  addToCart(userId: number, cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/${userId}/items`, cartItem, this.httpOptions);
  }

  // Update item quantity
  updateItemQuantity(userId: number, itemId: number, quantity: number): Observable<CartItem> {
    return this.http.put<CartItem>(
      `${this.apiUrl}/${userId}/items/${itemId}/quantity?quantity=${quantity}`,
      {},
      this.httpOptions
    );
  }

  // Remove item from cart
  removeFromCart(userId: number, itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/items/${itemId}`, this.httpOptions);
  }

  // Clear cart
  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/clear`, this.httpOptions);
  }

  // Update entire cart
  updateCart(userId: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${userId}`, cart, this.httpOptions);
  }

  // Delete cart
  deleteCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/delete`, this.httpOptions);
  }
}
