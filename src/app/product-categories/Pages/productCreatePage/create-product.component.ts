import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product-categories/services/product/product.service';
import { CategoriesService } from '../../services/product/categories.service';
import { Products } from 'src/app/product-categories/models/products';
import { Category } from 'src/app/product-categories/models/category';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [];
  newCategory: string = '';
  showNewCategoryInput = false;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      stockQuantity: [null, Validators.min(0)],
      brand: ['', Validators.required],
      sku: [''],
      discountPercentage: [0, Validators.min(0)],
      category: [null, Validators.required],
      image: [null]
    });

    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      this.selectedImage = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  addNewCategory(): void {
    const catName = this.newCategory.trim();
    if (catName && !this.categories.find(cat => cat.name === catName)) {
      const newCat: Category = {
        id: Date.now().toString(),
        name: catName,
        description: ''
      };
      this.categories.push(newCat);
      this.productForm.patchValue({ category: newCat });
    }
    this.newCategory = '';
    this.showNewCategoryInput = false;
  }

  resetFileInput(): void {
    this.selectedImage = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  submitProduct(): void {
    if (this.productForm.valid) {
      const formValues = this.productForm.value;

      const product = new Products();
      product.name = formValues.name;
      product.description = formValues.description;
      product.price = formValues.price;
      product.stockQuantity = formValues.stockQuantity;
      product.brand = formValues.brand;
      product.sku = formValues.sku;
      product.discountPercentage = formValues.discountPercentage;
      product.category = formValues.category;
      product.isActive = true;
      product.imageUrl = '';
      product.idUser= '123'; // Replace with actual user ID

      const formData = new FormData();
      formData.append('product', JSON.stringify(product));
      if (this.selectedImage) {
        formData.append('file', this.selectedImage);
      }
console.log('Form Data:', product);
      this.productService.addProductWithImage(formData).subscribe({
        next: (res) => {
          console.log('✅ Produit ajouté avec succès :', res);
          this.resetFileInput();
          this.productForm.reset();
          this.imagePreview = null;
          this.router.navigate(['/product-categories/list-product-admin']);
        },
        error: (err) => {
          console.error('❌ Erreur ajout produit :', err);
        }
      });
    } else {
      console.log('❌ Champs requis manquants');
      this.productForm.markAllAsTouched();
    }
  }
}
