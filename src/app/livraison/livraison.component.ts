import { Component, OnInit } from '@angular/core';
import { Livraison } from 'src/app/models/livraison.model';
import { LivraisonService } from 'src/app/services/livraison.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements OnInit {
  livraisons: Livraison[] = [];
  selectedLivraison?: Livraison;
  errorMessage: string = '';

  livreurs: any[] = []; // List of all livreurs
  selectedLivreurIds: { [key: number]: number } = {}; // Per-livraison selection

  constructor(private livraisonService: LivraisonService) {}

  ngOnInit(): void {
    this.getLivraisons();
    this.getLivreurs(); // Fetch livreurs on init
  }

  getLivraisons(): void {
    this.livraisonService.getAll().subscribe({
      next: (data: any) => {
        console.log("✅ Livraisons fetched successfully:", data);
  
        // Handle both paged and plain responses
        this.livraisons = Array.isArray(data) ? data : data.content || [];
  
      },
      error: (error) => {
        console.error("❌ Error fetching livraisons:", error);
        this.errorMessage = "Une erreur est survenue lors de la récupération des livraisons.";
      }
    });
  }
  

  getLivreurs(): void {
    this.livraisonService.getAllLivreurs().subscribe({
      next: (data) => {
        console.log("✅ Livreurs fetched successfully:", data);
        this.livreurs = data;
      },
      error: (error) => {
        console.error("❌ Error fetching livreurs:", error);
      }
    });
  }

  selectLivraison(livraison: Livraison): void {
    this.selectedLivraison = livraison;
    console.log("🔍 Selected livraison:", livraison);
  }

  deleteLivraison(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette livraison ?')) {
      this.livraisonService.delete(id).subscribe({
        next: () => {
          console.log(`🗑️ Livraison ${id} supprimée`);
          this.getLivraisons();
          this.selectedLivraison = undefined;
        },
        error: (error) => {
          console.error(`❌ Erreur lors de la suppression de la livraison ${id}:`, error);
        }
      });
    }
  }

  markAsLivree(id: number): void {
    this.livraisonService.markAsLivree(id).subscribe({
      next: (updated) => {
        console.log(`✅ Livraison ${id} marquée comme Livrée`, updated);
        const index = this.livraisons.findIndex(l => l.id === id);
        if (index !== -1) {
          this.livraisons[index] = updated;
        }
      },
      error: (error) => {
        console.error(`❌ Erreur lors du changement de statut pour livraison ${id}:`, error);
      }
    });
  }

  exportPdf(): void {
    this.livraisonService.exportToPdf().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'livraisons.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
        console.log('📄 PDF export successful');
      },
      error: (error) => {
        console.error('❌ Failed to export PDF:', error);
      }
    });
  }

  assignLivreurToLivraison(livraisonId: number): void {
    const livreurId = this.selectedLivreurIds[livraisonId];
    if (!livreurId) return;

    this.livraisonService.assignLivreur(livraisonId, livreurId).subscribe({
      next: (updated) => {
        console.log(`✅ Livreur assigné à la livraison ${livraisonId}`, updated);
        const index = this.livraisons.findIndex(l => l.id === livraisonId);
        if (index !== -1) {
          this.livraisons[index] = updated;
        }
      },
      error: (error) => {
        console.error(`❌ Erreur lors de l'assignation du livreur pour la livraison ${livraisonId}`, error);
      }
    });
  }
}
