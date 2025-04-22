export interface Cart {
  userId: number;
  items: CartItem[];
  totalPrice: number;           
  discountPercentage: number;  
}


export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  name: string;
}
