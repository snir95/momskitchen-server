# Mom's Kitchen - Backend Server

Express.js backend server for the Mom's Kitchen food ordering system with MongoDB integration and RESTful API endpoints.

## 🍽️ Project Overview

This is the backend server for "הבישולים של עליזה" (Aliza's Cooking), a food ordering system that allows customers to view available dishes and administrators to manage the menu.

## 🚀 Features

- **RESTful API** for dish management
- **MongoDB** database integration with Mongoose
- **CORS** enabled for frontend communication
- **Environment variables** support
- **Full CRUD operations** for dishes
- **Hebrew language support** in database schema

## 📋 API Endpoints

### Dishes Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dishes` | Fetch all dishes |
| `POST` | `/api/dishes` | Create a new dish |
| `PUT` | `/api/dishes/:id` | Update dish availability |
| `DELETE` | `/api/dishes/:id` | Delete a dish |

### Dish Schema

```javascript
{
  nameHebrew: String,        // Required - Hebrew dish name
  descriptionHebrew: String, // Required - Hebrew description
  price: Number,            // Required - Price in shekels
  imageUrl: String,         // Optional - Image URL
  isAvailableToday: Boolean // Default: false
}
```

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/snir95/momskitchen-server.git
   cd momskitchen-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/momskitchen
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 🗄️ Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The server will automatically create the database

### MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

## 📁 Project Structure

```
server/
├── models/
│   └── Dish.js          # Mongoose dish schema
├── routes/
│   └── dishes.js        # API routes for dishes
├── index.js             # Main server file
├── db.js               # Database connection
├── package.json
└── README.md
```

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests (to be implemented)

## 🌐 API Usage Examples

### Get All Dishes
```bash
curl http://localhost:5001/api/dishes
```

### Create a New Dish
```bash
curl -X POST http://localhost:5001/api/dishes \
  -H "Content-Type: application/json" \
  -d '{
    "nameHebrew": "שניצל עוף",
    "descriptionHebrew": "שניצל עוף טעים עם פירורי לחם",
    "price": 45,
    "imageUrl": "https://example.com/schnitzel.jpg",
    "isAvailableToday": true
  }'
```

### Update Dish Availability
```bash
curl -X PUT http://localhost:5001/api/dishes/[dish-id] \
  -H "Content-Type: application/json" \
  -d '{"isAvailableToday": false}'
```

### Delete a Dish
```bash
curl -X DELETE http://localhost:5001/api/dishes/[dish-id]
```

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5001` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/momskitchen` |

## 🚀 Deployment

### Heroku
1. Create a Heroku app
2. Add MongoDB add-on
3. Set environment variables
4. Deploy with Git

### Railway
1. Connect GitHub repository
2. Add MongoDB service
3. Set environment variables
4. Deploy automatically

### Render
1. Create a new Web Service
2. Connect GitHub repository
3. Add MongoDB service
4. Set environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Backend Developer**: [Your Name]
- **Project**: Mom's Kitchen Backend

## 🔗 Links

- **Frontend Repository**: [momskitchen-client](https://github.com/snir95/momskitchen-client)
- **Live Demo**: [Coming Soon]
- **API Documentation**: [Coming Soon]
