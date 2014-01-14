var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var productSchema = new Schema(
    {
        id: ObjectId,
        product_name: String,
        description: String,
        price: Number
    },
    {
        collection: 'products'
    }
);

module.exports = mongoose.model('product', productSchema);