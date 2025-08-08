"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MenuItem_1 = __importDefault(require("../models/MenuItem"));
const router = (0, express_1.Router)();
// GET /api/dishes - Fetch all dishes
router.get('/', async (_req, res) => {
    try {
        const dishes = await MenuItem_1.default.find({});
        res.json(dishes);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching dishes', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// GET /api/dishes/:id - Fetch a specific dish
router.get('/:id', async (req, res) => {
    try {
        const dish = await MenuItem_1.default.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json(dish);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching dish', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// POST /api/dishes - Create a new dish
router.post('/', async (req, res) => {
    try {
        const newDish = new MenuItem_1.default(req.body);
        const savedDish = await newDish.save();
        res.status(201).json(savedDish);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating dish', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// PUT /api/dishes/:id - Update a dish
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedDish = await MenuItem_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json(updatedDish);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating dish', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// PATCH /api/dishes/:id/availability - Toggle dish availability
router.patch('/:id/availability', async (req, res) => {
    try {
        const { id } = req.params;
        const { available } = req.body;
        const updatedDish = await MenuItem_1.default.findByIdAndUpdate(id, { available }, { new: true, runValidators: true });
        if (!updatedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json(updatedDish);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating dish availability', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// DELETE /api/dishes/:id - Delete a dish
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDish = await MenuItem_1.default.findByIdAndDelete(id);
        if (!deletedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json({ message: 'Dish deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting dish', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.default = router;
