import { Livreur } from './livreur.model';

export interface Livraison {
  id?: number;
  dateCreation: string;
  dateLivree: string;
  statusLivraison: string;
  livreur?: Livreur;
}
