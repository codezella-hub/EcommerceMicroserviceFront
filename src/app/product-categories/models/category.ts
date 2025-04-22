import { Products } from './products';

export class Category {
  id!: string;
  name!: string;
  description!: string;
  products?: Products[]; // facultatif car @JsonIgnore = pas toujours envoyé par l'API
}
