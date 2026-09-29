export type Category = "Pizza" | "Burgers" | "Beverages" | "Desserts";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  image: string;
  available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type OrderStatus = "Pending" | "Accepted" | "Preparing" | "Completed";

export interface Order {
  id: string;
  customerName: string;
  mobile: string;
  email: string;
  address: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
}
