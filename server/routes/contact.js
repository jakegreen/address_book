module.exports = function(app, auth, contact) {
    app.get('/api/contacts', auth, contact.list);
    app.post('/api/contact', auth, contact.addContact);
    app.delete('/api/contact/:id', auth, contact.deleteContact);
    app.get('/api/contact/:id', auth, contact.getContact);
    app.put('/api/contact/:id', auth, contact.putContact);
};
