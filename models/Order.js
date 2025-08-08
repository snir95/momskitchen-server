const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
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

const orderSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Order', orderSchema);
