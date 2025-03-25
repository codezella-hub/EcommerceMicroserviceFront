import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReclamationService } from 'src/app/admin/services/reclamation/reclamation.service';
import { Reclamation } from 'src/app/models/reclamation';

declare var $: any;

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  @ViewChild('addModal') addModalRef!: ElementRef;
  @ViewChild('updateModal') updateModalRef!: ElementRef;
  
  allReclamations: Reclamation[] = [];
  userReclamations: Reclamation[] = [];
  selectedReclamationId: number | null = null;
  selectedReclamation: Reclamation = new Reclamation();
  
  // Set your static user ID here
  currentUserId: string = 'azereza54145154a';
  
  addForm: FormGroup;
  updateForm: FormGroup;

  constructor(
    private reclamationService: ReclamationService,
    private fb: FormBuilder
  ) {
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
        this.allReclamations = data;
        this.filterUserReclamations();
      },
      (error) => {
        console.error("Error fetching reclamations", error);
      }
    );
  }

  filterUserReclamations() {
    this.userReclamations = this.allReclamations.filter(
      rec => rec.user_id === this.currentUserId
    );
  }

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
    if (this.selectedReclamationId) {
      this.reclamationService.deleteReclamationById(this.selectedReclamationId).subscribe(
        () => {
          this.allReclamations = this.allReclamations.filter(r => r.id !== this.selectedReclamationId);
          this.filterUserReclamations();
          this.selectedReclamationId = null;
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
    if (this.updateForm.invalid) return;

    const updatedReclamation = {
      ...this.selectedReclamation,
      ...this.updateForm.value,
      user_id: this.currentUserId
    };

    this.reclamationService.updateReclamationById(
      updatedReclamation.id, 
      updatedReclamation
    ).subscribe(
      (result) => {
        const index = this.allReclamations.findIndex(r => r.id === result.id);
        if (index !== -1) {
          this.allReclamations[index] = result;
        }
        this.filterUserReclamations();
        $(this.updateModalRef.nativeElement).modal('hide');
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
    if (this.addForm.invalid) return;

    const newReclamation = {
      ...this.addForm.value,
      user_id: this.currentUserId
    };

    this.reclamationService.addReclamation(newReclamation).subscribe(
      (result) => {
        this.allReclamations.push(result);
        this.filterUserReclamations();
        this.addForm.reset();
        $(this.addModalRef.nativeElement).modal('hide');
      },
      (error) => {
        console.error('Error adding reclamation:', error);
      }
    );
  }
}