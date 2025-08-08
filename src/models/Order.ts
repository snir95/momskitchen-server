import mongoose, { Document, Schema } from 'mongoose';
import { Order, OrderItem } from '../types';

export interface OrderDocument extends Document {
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

const orderItemSchema = new Schema({
  menu_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new Schema({
  customer_name: {
    type: String,
    required: true,
    description: 'שם מלא של הלקוח'
  },
  customer_email: {
    type: String,
    required: true,
    description: 'אימייל של הלקוח'
  },
  customer_phone: {
    type: String,
    required: true,
    description: 'מספר טלפון של הלקוח'
  },
  delivery_address: {
    type: String,
    description: 'כתובת למשלוח'
  },
  items: [orderItemSchema],
  total_amount: {
    type: Number,
    required: true,
    description: 'סכום כולל להזמנה'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered'],
    default: 'pending',
    description: 'סטטוס הזמנה'
  },
  order_type: {
    type: String,
    enum: ['delivery', 'pickup'],
    default: 'delivery',
    description: 'סוג הזמנה'
  },
  special_instructions: {
    type: String,
    description: 'הוראות מיוחדות להזמנה'
  }
}, {
  timestamps: true
});

export default mongoose.model<OrderDocument>('Order', orderSchema);


