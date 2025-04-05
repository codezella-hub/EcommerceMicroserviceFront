import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Cart, CartItem } from '../../entities/cart.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  userId: number = 1; 

  constructor(private cartService: CartService, private http: HttpClient) { }

  checkout() {
    if (!this.cart || !this.cart.items.length) return;
  
    const items = this.cart.items.map(item => ({
      name: item.name,
      price: Number(item.price), 
      quantity: item.quantity
    }));

  
    this.http.post<any>('http://localhost:5000/api/payment/create-checkout-session', { items }).subscribe(
      (response) => {
        if (response.url) {
          window.location.href = response.url;
          this.clearCart();
        }
       
      },
      (error) => {
        console.error('Checkout error:', error);
      }
    );
  }
  
  get total(): number {
    if (!this.cart?.items?.length) return 0;
    return this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  ngOnInit(): void {
    this.loadCart();
    console.log(this.cart);
  }

  loadCart() {
    this.cartService.getCartByUserId(this.userId).subscribe(
      (cart: Cart) => {
        this.cart = cart;
      },
      error => {
        console.error('Error loading cart:', error);
        if (error.status === 0) {
          console.error('CORS error or server not reachable');
        } else {
          console.error(`Server returned status code ${error.status}`);
        }
        console.error('Error details:', error.message);
      }
    );
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(this.userId, itemId).subscribe(
      () => {
        this.loadCart();
      },
      error => {
        console.error('Error removing item:', error);
      }
    );
  }

  updateQuantity(itemId: number, quantity: number) {
    if (quantity < 1) return;
    
    this.cartService.updateItemQuantity(this.userId, itemId, quantity).subscribe(
      () => {
        this.loadCart();
      },
      error => {
        console.error('Error updating quantity:', error);
      }
    );
  }

  clearCart() {
    this.cartService.clearCart(this.userId).subscribe(
      () => {
        this.loadCart();
      },
      error => {
        console.error('Error clearing cart:', error);
      }
    );
  }

  addToCart(item: CartItem) {
    this.cartService.addToCart(this.userId, item).subscribe(
      () => {
        this.loadCart();
      },
      error => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
}
