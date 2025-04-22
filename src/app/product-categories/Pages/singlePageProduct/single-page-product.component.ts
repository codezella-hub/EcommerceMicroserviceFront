import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product-categories/services/product/product.service'
import { Products } from 'src/app/product-categories/models/products'
/////////
import {CartItem } from '../../../public/entities/cart.model';
import { CartService } from '../../../public/service/cart.service';


@Component({
  selector: 'app-single-page-product',
  templateUrl: './single-page-product.component.html',
  styleUrls: ['./single-page-product.component.scss']
})
export class SinglePageProductComponent implements OnInit {
  productId: string = '';
  product: Products | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id')!;
      this.getProductDetails(this.productId);
    });
  }

  getProductDetails(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res;
      },
      error: (err) => {
        console.error('❌ Error fetching product:', err);
      }
    });
  }

  getImageUrl(image: string): string {

    return `http://localhost:8089/uploads/${image}`;
  }

  // Add the product to the cart
  addToCart(product: Products, event: MouseEvent): void {
      event.stopPropagation();
    
      const userId = 1; // 🔄 Remplace ceci par l'ID réel de l'utilisateur (depuis le token ou un service)
      
      const cartItem: CartItem = {
        productId: product.id,
        quantity: 1,
        price: product.price
      };
    
      this.cartService.addToCart(userId, cartItem).subscribe({
        next: (response) => {
          console.log('✅ Produit ajouté au panier :', response);
        },
        error: (error) => {
          console.error('❌ Erreur lors de l\'ajout au panier :', error);
        }
      });
    }
}
