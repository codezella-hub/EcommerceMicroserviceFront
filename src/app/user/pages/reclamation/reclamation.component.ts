import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { ReclamationService } from 'src/app/admin/services/reclamation/reclamation.service';
import { Reclamation } from 'src/app/models/reclamation';


declare var $: any;

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  @ViewChild('addModal') addModalRef!: ElementRef;
  @ViewChild('updateModal') updateModalRef!: ElementRef;
  
  allReclamations: Reclamation[] = [];
  userReclamations: Reclamation[] = [];
  selectedReclamationId: number | null = null;
  selectedReclamation: Reclamation = new Reclamation();
  selectedTypeFilter: string = 'ALL'; // Default is ALL
  
  
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
    const filteredByUser = this.allReclamations.filter(
      rec => rec.user_id === this.currentUserId
    );
  
    if (this.selectedTypeFilter === 'ALL') {
      this.userReclamations = filteredByUser;
    } else {
      this.userReclamations = filteredByUser.filter(
        rec => rec.type === this.selectedTypeFilter
      );
    }
  }
  
  onTypeFilterChange(newType: string) {
    this.selectedTypeFilter = newType;
    this.filterUserReclamations();
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



// Add this method to your ReclamationComponent class
generatePDF() {
  const doc = new jsPDF();
  let yPos = 20;

  // Add title
  doc.setFontSize(18);
  doc.text('Reclamation Report', 14, 15);
  
  // Add current date
  doc.setFontSize(12);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 25);
  
  // Add filter information
  doc.text(`Filter Type: ${this.selectedTypeFilter}`, 14, 35);
  doc.text(`Total Reclamations: ${this.userReclamations.length}`, 14, 45);

  // Create table headers
  doc.setFontSize(12);
  //doc.setFont(undefined, 'bold');
  doc.text('Title', 14, 60);
  doc.text('Type', 70, 60);
  doc.text('Description', 130, 60);
  //doc.setFont(undefined, 'normal');

  // Add reclamation data
  this.userReclamations.forEach((reclamation, index) => {
    yPos = 70 + (index * 40);
    
    if (yPos > 280) { // Add new page if needed
      doc.addPage();
      yPos = 20;
    }

    doc.text(reclamation.titre, 14, yPos);
    doc.text(reclamation.type, 70, yPos);
    doc.text(doc.splitTextToSize(reclamation.description, 50), 130, yPos);
    
    // Add separator line
    doc.setLineWidth(0.5);
    doc.line(14, yPos + 5, 200, yPos + 5);
  });

  // Save the PDF
  doc.save(`reclamations_${new Date().toISOString()}.pdf`);
}
}