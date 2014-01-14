module.exports = function(app, auth, product) {
    app.get('/api/products', auth, product.list);
//    app.get('/api/product/:id', auth, product.product);
    app.post('/api/product', auth, product.addProduct);
//    app.put('/api/product/:id', product.editProduct);
//    app.delete('/api/post/:id', product.deleteProduct);
}
