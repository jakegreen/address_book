module.exports = function(app, auth, product) {
    app.get('/api/products', auth, product.list);
    app.post('/api/product', auth, product.addProduct);
    app.delete('/api/product/:id', auth, product.deleteProduct);
    app.get('/api/product/:id', auth, product.getProduct);
    app.put('/api/product/:id', auth, product.putProduct);
}
