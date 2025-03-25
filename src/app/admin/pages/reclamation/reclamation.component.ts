import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ReclamationService } from 'src/app/admin/services/reclamation/reclamation.service';
import { Reclamation } from 'src/app/models/reclamation';

declare var $: any; // For Bootstrap modal methods

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  @ViewChild('addModal') addModalRef!: ElementRef;
  @ViewChild('updateModal') updateModalRef!: ElementRef;
  
  reclamations: Reclamation[] = [];
  selectedReclamationId: number | null = null;
  selectedReclamation: Reclamation = new Reclamation();
  
  // Static user ID - change this to your actual static user ID
  staticUserId: string = 'current_user_id_123';
  
  // Form groups
  addForm: FormGroup;
  updateForm: FormGroup;

  constructor(
    private reclamationService: ReclamationService,
    private fb: FormBuilder
  ) {
    // Initialize forms
    this.addForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.updateForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations() {
    this.reclamationService.getListReclamationsFromBackend().subscribe(
      (data) => {
        this.reclamations = data;
        console.log('Reclamations received:', data);
      },
      (error) => {
        console.error("Error fetching reclamations", error);
      }
    );
  }

  // Form control getters
  get addControls() {
    return this.addForm.controls;
  }

  get updateControls() {
    return this.updateForm.controls;
  }

  openDeleteModal(id: number) {
    this.selectedReclamationId = id;
  }

  deleteReclamation() {
    if (this.selectedReclamationId !== null) {
      this.reclamationService.deleteReclamationById(this.selectedReclamationId).subscribe(
        () => {
          this.reclamations = this.reclamations.filter(r => r.id !== this.selectedReclamationId);
          this.selectedReclamationId = null;
          console.log('Reclamation deleted successfully');
        },
        (error) => {
          console.error('Error deleting reclamation:', error);
        }
      );
    }
  }

  openUpdateModal(reclamation: Reclamation) {
    this.selectedReclamation = { ...reclamation };
    this.updateForm.patchValue({
      titre: reclamation.titre,
      type: reclamation.type,
      description: reclamation.description
    });
  }

  updateReclamation() {
    if (this.updateForm.invalid) {
      this.markFormGroupTouched(this.updateForm);
      return;
    }

    const updatedReclamation = {
      ...this.selectedReclamation,
      ...this.updateForm.value,
      user_id: this.staticUserId // Include static user ID
    };

    this.reclamationService.updateReclamationById(
      updatedReclamation.id, 
      updatedReclamation
    ).subscribe(
      (result) => {
        const index = this.reclamations.findIndex(r => r.id === result.id);
        if (index !== -1) {
          this.reclamations[index] = result;
        }
        console.log('Reclamation updated successfully');
        $(this.updateModalRef.nativeElement).modal('hide'); // Close modal
      },
      (error) => {
        console.error('Error updating reclamation:', error);
      }
    );
  }

  openAddModal() {
    this.addForm.reset();
  }

  addReclamation() {
    if (this.addForm.invalid) {
      this.markFormGroupTouched(this.addForm);
      return;
    }

    const newReclamation = {
      ...this.addForm.value,
      user_id: this.staticUserId // Include static user ID
    };

    this.reclamationService.addReclamation(newReclamation).subscribe(
      (result) => {
        this.reclamations.push(result);
        console.log('Reclamation added successfully');
        this.addForm.reset();
        $(this.addModalRef.nativeElement).modal('hide'); // Close modal
      },
      (error) => {
        console.error('Error adding reclamation:', error);
      }
    );
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}