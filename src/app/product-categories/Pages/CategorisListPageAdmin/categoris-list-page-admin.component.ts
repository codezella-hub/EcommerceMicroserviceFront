import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/product-categories/services/product/categories.service';  // Import the CategoriesService
import { Category } from 'src/app/product-categories/models/category';  // Import the Category model

@Component({
  selector: 'app-categoris-list-page-admin',
  templateUrl: './categoris-list-page-admin.component.html',
  styleUrls: ['./categoris-list-page-admin.component.scss']
})
export class CategorisListPageAdminComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  removeCategory(id: string): void {
    this.categoriesService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c.id !== id);
        console.log('Category removed successfully');
      },
      error: (err) => {
        console.error('Error removing category:', err);
      }
    });
  }

  updateCategory(category: Category): void {
    // Implement update logic if needed
    console.log('Updating category:', category);
  }
}
