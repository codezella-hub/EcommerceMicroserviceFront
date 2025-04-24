import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router
import { CategoriesService } from 'src/app/product-categories/services/product/categories.service'; // Import the CategoriesService

@Component({
  selector: 'app-categories-update-page',
  templateUrl: './categories-update-page.component.html',
  styleUrls: ['./categories-update-page.component.scss']
})
export class CategoriesUpdatePageComponent implements OnInit {
  categoryForm!: FormGroup; // FormGroup for reactive form
  categoryId!: string;  // Variable to hold the category ID

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,  // To extract the ID from the URL
    private router: Router  // To navigate after updating
  ) {}

  ngOnInit(): void {
    // Get the category ID from the URL
    this.categoryId = this.route.snapshot.paramMap.get('id')!;

    // Initialize the form with form controls and validations
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),  // Name is required and must be at least 3 characters
      description: new FormControl('', [Validators.required, Validators.minLength(5)])  // Description is required and must be at least 5 characters
    });

    // Fetch the existing category data and set the form values
    this.categoriesService.getCategoryById(this.categoryId).subscribe(
      (category) => {
        this.categoryForm.patchValue({
          name: category.name,
          description: category.description
        });
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );
  }

  // Method to handle form submission and send updated data to Spring Boot backend
  updateCategory() {
    if (this.categoryForm.valid) {
      this.categoriesService.updateCategory(this.categoryId, this.categoryForm.value).subscribe(
        (response) => {
          console.log('Category updated successfully:', response);
          this.router.navigate(['/product-categories/list-categorie-admin']);  // Navigate to categories list after successful update
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    } else {
      // If form is invalid, mark all fields as touched to show validation errors
      this.categoryForm.markAllAsTouched();
    }
  }
}

