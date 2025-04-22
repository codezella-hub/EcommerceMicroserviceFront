import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product-categories/services/product/product.service';
import { Products } from 'src/app/product-categories/models/products';

@Component({
  selector: 'app-list-page-product-admin',
  templateUrl: './list-page-product-admin.component.html',
  styleUrls: ['./list-page-product-admin.component.scss']
})
export class ListPageProductAdminComponent implements OnInit {
  products: Products[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  removeProduct(id:string):void
  {

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        console.log('Product removed successfully');
      },
      error: (err) => {
        console.error('Error removing product:', err);
      }
    });
  }
  Update(product: Products): void {
    // Here you can implement adding to the cart logic (call a cart service or something else)
    console.log(`${product.name} added to cart!`);
  }
}
