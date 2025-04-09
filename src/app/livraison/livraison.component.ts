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

  constructor(private livraisonService: LivraisonService) {}

  ngOnInit(): void {
    this.getLivraisons();
  }

  getLivraisons(): void {
    this.livraisonService.getAll().subscribe({
      next: (data: Livraison[]) => {
        console.log("✅ Livraisons fetched successfully:", data);
        this.livraisons = data;
      },
      error: (error) => {
        console.error("❌ Error fetching livraisons:", error);
        this.errorMessage = "Une erreur est survenue lors de la récupération des livraisons.";
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
}
