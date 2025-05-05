export interface Item {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  userId: number;
  createdAt: Date;
  category: string;
}
