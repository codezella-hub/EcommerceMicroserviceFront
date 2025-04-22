import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product-categories/services/product/product.service';
import { CategoriesService } from '../../services/product/categories.service';
import { Products } from 'src/app/product-categories/models/products';
import { Category } from 'src/app/product-categories/models/category';

@Component({
  selector: 'app-update-page-product',
  templateUrl: './update-page-product.component.html',
  styleUrls: ['./update-page-product.component.scss']
})
export class UpdatePageProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [];
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  productId: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    // Récupération ID produit
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      this.loadProduct();
    });

    // Form vide initialisé
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      stockQuantity: [null, Validators.min(0)],
      brand: ['', Validators.required],
      sku: [''],
      discountPercentage: [0, Validators.min(0)],
      category: [null, Validators.required],
    });

    // Charger catégories
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.error('Catégories non chargées:', err),
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: Products) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stockQuantity: product.stockQuantity,
          brand: product.brand,
          sku: product.sku,
          discountPercentage: product.discountPercentage,
          category: product.category,
        });

        this.imagePreview = `http://localhost:8089/uploads/${product.imageUrl}`;
      },
      error: (err) => console.error('Produit non trouvé:', err),
    });
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      this.selectedImage = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(this.selectedImage);
    }
  }

  submitUpdate(): void {
    if (this.productForm.valid) {
      const updatedProduct = this.productForm.value;

      const formData = new FormData();
      formData.append('product', JSON.stringify({ ...updatedProduct, id: this.productId }));

      if (this.selectedImage) {
        formData.append('file', this.selectedImage);
      }

      this.productService.updateProductWithImage(formData).subscribe({
        next: () => console.log('✅ Produit mis à jour'),
        error: (err) => console.error('❌ Erreur MAJ produit:', err),
      });
    }
  }
}
