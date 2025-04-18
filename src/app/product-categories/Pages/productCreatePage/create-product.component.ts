import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product-categories/services/product/product.service';
import { Products } from 'src/app/product-categories/models/products';
import { Category } from 'src/app/product-categories/models/category';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [
    { id: '1', name: 'Dresses', description: '' },
    { id: '2', name: 'Shirts', description: '' },
    { id: '3', name: 'Jeans', description: '' },
    { id: '4', name: 'Shoes', description: '' }
  ];
  newCategory: string = '';
  showNewCategoryInput = false;
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) {}

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
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addNewCategory(): void {
    const catName = this.newCategory.trim();
    if (catName && !this.categories.find(cat => cat.name === catName)) {
      const newCat: Category = {
        id: Date.now().toString(), // or use uuid
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

      // ✅ Use class Products
      const product = new Products();
      product.name = formValues.name;
      product.description = formValues.description;
      product.price = formValues.price;
      product.stockQuantity = formValues.stockQuantity;
      product.brand = formValues.brand;
      product.sku = formValues.sku;
      product.discountPercentage = formValues.discountPercentage;
      product.category = formValues.category;
      product.isActive = true; // default value
      product.imageUrl = ''; // will be handled by backend

      const formData = new FormData();
      formData.append('product', JSON.stringify(product)); // match @RequestParam("product")
      if (this.selectedImage) {
      formData.append('file', this.selectedImage); // match @RequestParam("file")
      }


      this.productService.addProductWithImage(formData).subscribe({
        next: (res) => {
          console.log('✅ Produit ajouté avec succès :', res);
          this.resetFileInput();
          this.productForm.reset();
          this.imagePreview = null;
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
