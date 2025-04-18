import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  filteredProducts: any[] = [];
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("hello");
    this.productService.getAllProducts().subscribe({
      next: (data: any[]) => {
        this.products = data;
        this.applySearch();
      },
      error: (error) => {
        console.error("Error fetching products:", error);
      }
    });
  }

  applySearch(): void {
    const keyword = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(keyword) ||
      product.category?.name?.toLowerCase().includes(keyword)
    );
    this.currentPage = 1;
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addToCart(product: any, event: MouseEvent): void {
    event.stopPropagation();
    console.log('Add to cart:', product.name);
  }

  viewProduct(product: any): void {
    // Optional: navigate to a product detail page
    console.log('View product details:', product.name);
  }

  getImageUrl(image: string): string {
    return `http://localhost:8089/uploads/${image}`;
  }
}
