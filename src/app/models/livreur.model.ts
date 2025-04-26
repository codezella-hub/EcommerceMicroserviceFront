import { Livraison } from './livraison.model';

export interface Livreur {
  idLivreur: number;
  nom: string;
  prenom: string;
  addresse: string;
  mobile: number;
  livraisons?: Livraison[];
}
