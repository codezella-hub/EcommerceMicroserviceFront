import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Import Reactive Forms
import { CategoriesService } from 'src/app/product-categories/services/product/categories.service'; // Import the service


import { Category } from 'src/app/product-categories/models/category';
import {Router} from "@angular/router";  // Import the Category class

@Component({
  selector: 'app-categories-create-page',
  templateUrl: './categories-create-page.component.html',
  styleUrls: ['./categories-create-page.component.scss']
})
export class CategoriesCreatePageComponent implements OnInit {
  categoryForm!: FormGroup; // FormGroup for reactive form

  constructor(private categoriesService: CategoriesService, private router: Router ) {}

  ngOnInit(): void {
    // Initialize the form with form controls and validations
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),  // Name is required and must be at least 3 characters
      description: new FormControl('', [Validators.required, Validators.minLength(5)])  // Description is required and must be at least 5 characters
    });
  }

  // Method to handle form submission and send data to Spring Boot backend
  createCategory() {
    if (this.categoryForm.valid) {
      this.categoriesService.addCategory(this.categoryForm.value).subscribe(
        (response) => {
          console.log('Category created successfully:', response);
          // Optionally, you can redirect the user or reset the form after successful creation
          this.router.navigate(['/product-categories/list-categorie-admin']);
        },
        (error) => {
          console.error('Error creating category:', error);
        }
      );
    } else {
      // If form is invalid, mark all fields as touched to show validation errors
      this.categoryForm.markAllAsTouched();
    }
  }
}
