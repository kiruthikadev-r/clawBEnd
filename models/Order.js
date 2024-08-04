const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: Schema.Types.Mixed, required: true }, // Use Mixed if IDs are not always ObjectId
        name: { type: String, required: true },
        weight: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true }
    }],
    totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
