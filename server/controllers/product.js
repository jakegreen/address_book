/*
** Load the appropriate models
 */

var Product = require('../models/product.js');

/*
** GET requests
 */
module.exports.list = function (req, res) {
    Product.find({}, function(err, products) {
        if (err) {
            res.send(err);
        }

//        products.forEach(function(product) {
//            console.log('Product found: ' + product._id);
//        });

        res.json({
            products: products
        });
    });
};

/*
    POST requests
    Type of request is used when server-side state does not matter (e.g. state could exist, be modified or not exist)

    http://www.stormpath.com/blog/put-or-post - provides a good explanation of POST vs. PUT requests
*/
module.exports.addProduct = function (req, res) {
    // Create a contact in database
    var contact = new Contact ({
        'product_name': req.body.product_name,
        'description': req.body.description,
        'price': req.body.price,
        'created': req.body.created
    });

    contact.save(function(err){
        if (err) {
            console.log('Error saving product: ' + err);
            res.json({'error': 'addProduct'});
        }

        res.json({
            contact: contact
        });
    });
};