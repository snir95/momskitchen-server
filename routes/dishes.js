const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');

// GET /api/dishes - Fetch all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find({});
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dishes', error: error.message });
  }
});

// POST /api/dishes - Create a new dish
router.post('/', async (req, res) => {
  try {
    const { nameHebrew, descriptionHebrew, price, imageUrl, isAvailableToday } = req.body;
    
    const newDish = new Dish({
      nameHebrew,
      descriptionHebrew,
      price,
      imageUrl,
      isAvailableToday: isAvailableToday || false
    });
    
    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (error) {
    res.status(400).json({ message: 'Error creating dish', error: error.message });
  }
});

// PUT /api/dishes/:id - Update a dish (specifically for toggling isAvailableToday)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailableToday } = req.body;
    
    const updatedDish = await Dish.findByIdAndUpdate(
      id,
      { isAvailableToday },
      { new: true, runValidators: true }
    );
    
    if (!updatedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    
    res.json(updatedDish);
  } catch (error) {
    res.status(400).json({ message: 'Error updating dish', error: error.message });
  }
});

// DELETE /api/dishes/:id - Delete a dish
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedDish = await Dish.findByIdAndDelete(id);
    
    if (!deletedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    
    res.json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting dish', error: error.message });
  }
});

module.exports = router;
