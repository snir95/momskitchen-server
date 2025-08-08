"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const orderItemSchema = new mongoose_1.Schema({
    menu_item_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const orderSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.default.model('Order', orderSchema);
