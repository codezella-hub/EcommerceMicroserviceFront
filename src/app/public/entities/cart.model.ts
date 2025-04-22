export interface Cart {
  userId: number;
  items: CartItem[];
  totalPrice: number;           
  discountPercentage: number;  
}


export interface CartItem {
  id?: number;
  productId: string;
  quantity: number;
  price: number;
  name?: string;
}
