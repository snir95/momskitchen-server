"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const dishes_1 = __importDefault(require("./routes/dishes"));
const orders_1 = __importDefault(require("./routes/orders"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basic route
app.get('/', (_req, res) => {
    res.json({ message: 'Backend is running' });
});
// API routes
app.use('/api/dishes', dishes_1.default);
app.use('/api/orders', orders_1.default);
// Start server
const PORT = process.env.PORT || 5001;
const startServer = async () => {
    try {
        // Connect to MongoDB
        await (0, db_1.default)();
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('Backend is running');
        });
    }
    catch (error) {
        console.error('Failed to start server:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1);
    }
};
startServer();
