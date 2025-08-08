const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/Dish');

// GET /api/orders - Fetch all orders (admin only)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).populate('items.menu_item_id');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// GET /api/orders/:id - Fetch a specific order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menu_item_id');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
});

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      delivery_address,
      items,
      total_amount,
      order_type,
      special_instructions
    } = req.body;

    // Validate that all menu items exist
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menu_item_id);
      if (!menuItem) {
        return res.status(400).json({ 
          message: `Menu item with ID ${item.menu_item_id} not found` 
        });
      }
      if (!menuItem.available) {
        return res.status(400).json({ 
          message: `Menu item "${menuItem.name}" is not available` 
        });
      }
    }

    const newOrder = new Order({
      customer_name,
      customer_email,
      customer_phone,
      delivery_address,
      items,
      total_amount,
      order_type: order_type || 'delivery',
      special_instructions
    });

    const savedOrder = await newOrder.save();
    const populatedOrder = await Order.findById(savedOrder._id).populate('items.menu_item_id');
    
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
});

// PUT /api/orders/:id - Update order status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Only allow updating certain fields
    const allowedUpdates = ['status', 'special_instructions'];
    const filteredUpdates = {};
    
    for (const key of allowedUpdates) {
      if (updateData[key] !== undefined) {
        filteredUpdates[key] = updateData[key];
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      filteredUpdates,
      { new: true, runValidators: true }
    ).populate('items.menu_item_id');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: error.message });
  }
});

// PATCH /api/orders/:id/status - Update order status specifically
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('items.menu_item_id');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order status', error: error.message });
  }
});

// DELETE /api/orders/:id - Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedOrder = await Order.findByIdAndDelete(id);
    
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting order', error: error.message });
  }
});

module.exports = router;
