import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Cart, CartItem } from '../../entities/cart.model';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../service/product.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  userId: number = 1; 
  userEmail: string = 'sofiennemrabet16@gmail.com'; // Email de l'utilisateur

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private productService: ProductService,
    
  ) {}
  

  checkout() {
    if (!this.cart || !this.cart.items.length) return;
  
    const items = this.cart.items.map(item => ({
      productId: item.productId,  
      name: item.name,
      price: Number(item.price),
      quantity: item.quantity
    }));
    

  
   
    const dateCommande = new Date();
    
    this.http.post<any>('http://localhost:5000/api/payment/create-checkout-session', {
      items,
      userId: this.userId,
      dateCommande
    })
    .subscribe(
      (response) => {
        if (response.url) {
          window.location.href = response.url;   // Redirige vers le paiement
          this.clearCart(); // Vider le panier après le paiement

         
        }
      },
      (error) => {
        console.error('Erreur lors du paiement:', error);
      }
    );
     // Appel de l'API backend pour envoyer un e-mail après checkout
     this.sendOrderConfirmationEmail(this.userEmail);
  }
  sendOrderConfirmationEmail(email: string) {
    this.http.post<any>(`http://localhost:8222/api/cart/${this.userId}/checkout`, email)
      .subscribe(
        (response) => {
          console.log('E-mail de confirmation envoyé:', response);
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
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
        this.enrichCartItemsWithProducts(); 
      },
      error => {
        console.error('Erreur de chargement du panier:', error);
      }
    );
  }
  
  enrichCartItemsWithProducts() {
    if (!this.cart) return;
  
    const fetches = this.cart.items.map(item =>
      this.productService.getProductById(item.productId).toPromise()
        .then(product => {
          if (product) { 
            item.name = product.name;
            item.price = product.price;
          } else {
            console.warn(`Produit non trouvé pour l'ID ${item.id}`);
          }
        })
        .catch(err => {
          console.error(`Erreur chargement produit ${item.id}`, err);
        })
    );
  
    Promise.all(fetches).then(() => {
      console.log("Panier enrichi :", this.cart);
    });
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
