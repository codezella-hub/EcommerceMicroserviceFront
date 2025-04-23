import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';
import { OrderItem } from '../../entities/OrderItem';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;

  selectedOrder: any = null;
  isEditModalOpen: boolean = false;
  editedQuantity: number = 1;

  constructor(
    private historyService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const userId = '1'; // Test ID
    this.historyService.getHistoriesByUserId(userId).subscribe({
      next: (data) => {
        this.orders = data;
        this.enrichOrdersWithProductNames();
      },
      error: (error) => {
        console.error('Erreur de récupération des commandes :', error);
        this.loading = false;
      }
    });
  }

  enrichOrdersWithProductNames(): void {
    const fetches = this.orders.map(order =>
      this.productService.getProductById(order.productId).toPromise()
        .then(product => {
          if (product && product.name) {
            order.name = product.name;
          } else {
            console.warn(`Produit non trouvé pour l'ID ${order.productId}`);
          }
        })
        .catch(err => {
          console.error(`Erreur produit ${order.productId} :`, err);
        })
    );

    Promise.all(fetches).then(() => {
      this.loading = false;
      console.log("Commandes enrichies :", this.orders);
    });
  }

  deleteOrder(order: any) {
    if (confirm('Supprimer cette commande ?')) {
      this.historyService.deleteHistorie(order._id).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o._id !== order._id);
          alert('Commande supprimée.');
        },
        error: (err) => {
          console.error('Erreur suppression :', err);
          alert('Échec de la suppression.');
        }
      });
    }
  }

  openEditModal(order: any) {
    this.selectedOrder = { ...order };
    this.editedQuantity = this.selectedOrder.quantity;
    this.isEditModalOpen = true;
  }

  updateOrder() {
    const updateData = { totalPrice: this.selectedOrder.totalPrice=(this.selectedOrder.totalPrice/this.selectedOrder.quantity)*this.editedQuantity,quantity: this.editedQuantity };
    this.historyService.updateHistorie(this.selectedOrder._id, updateData).subscribe({
      next: () => {
        const index = this.orders.findIndex(o => o.id === this.selectedOrder.id);
        if (index !== -1) {
          this.orders[index].quantity = this.editedQuantity;
        }
        alert('Commande mise à jour.');
        this.closeModal();
      },
      error: (err) => {
        console.error('Erreur mise à jour :', err);
        alert('Échec de la mise à jour.');
      }
    });
  }

  closeModal() {
    this.isEditModalOpen = false;
    this.selectedOrder = null;
  }
}
