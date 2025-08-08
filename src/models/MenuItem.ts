import mongoose, { Document, Schema } from 'mongoose';
import { MenuItem } from '../types';

export interface MenuItemDocument extends Document {
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
  image_url?: string;
  available: boolean;
  ingredients?: string;
  spice_level: 'mild' | 'medium' | 'spicy';
}

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    description: 'שם המנה'
  },
  description: {
    type: String,
    required: true,
    description: 'תיאור המנה'
  },
  price: {
    type: Number,
    required: true,
    description: 'מחיר'
  },
  category: {
    type: String,
    required: true,
    enum: ['appetizer', 'main', 'dessert', 'beverage'],
    description: 'קטגוריית המנה'
  },
  image_url: {
    type: String,
    description: 'כתובת URL של תמונת המנה'
  },
  available: {
    type: Boolean,
    default: true,
    description: 'האם המנה זמינה היום'
  },
  ingredients: {
    type: String,
    description: 'מרכיבים עיקריים'
  },
  spice_level: {
    type: String,
    enum: ['mild', 'medium', 'spicy'],
    default: 'mild',
    description: 'רמת חריפות'
  }
}, {
  timestamps: true
});

export default mongoose.model<MenuItemDocument>('MenuItem', menuItemSchema);


