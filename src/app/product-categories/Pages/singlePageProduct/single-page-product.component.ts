import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product-categories/services/product/product.service'
import { Products } from 'src/app/product-categories/models/products'


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
   // private cartService: CartService
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
  addToCart(product: Products): void {
    //this.cartService.addProductToCart(product);
    console.log(`${product.name} added to cart!`);
  }
}
