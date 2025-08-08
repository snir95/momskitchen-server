export interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
  image_url?: string;
  available: boolean;
  ingredients?: string;
  spice_level: 'mild' | 'medium' | 'spicy';
}

export interface Order {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address?: string;
  items: OrderItem[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  order_type: 'delivery' | 'pickup';
  special_instructions?: string;
}

export interface OrderItem {
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
}


