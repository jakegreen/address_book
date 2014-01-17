/*
** Load the appropriate models
 */

var Contact = require('../models/contact.js');

/*
** GET requests
 */
module.exports.list = function (req, res) {
    Contact.find({}, function(err, contacts) {
        if (err) {
            res.send(err);
        }

//        contacts.forEach(function(contact) {
//            console.log('Contact found: ' + contact._id);
//        });

        res.json({
            contacts: contacts
        });
    });
};

/*
    POST requests
    Type of request is used when server-side state does not matter (e.g. state could exist, be modified or not exist)

    http://www.stormpath.com/blog/put-or-post - provides a good explanation of POST vs. PUT requests
*/
module.exports.addContact = function (req, res) {
    // Create a contact in database
    var contact = new Contact ({
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'company': req.body.company,
        'phone': req.body.phone,
        'email': req.body.email,
        'address': req.body.address,
        'city': req.body.city,
        'state': req.body.state,
        'zipcode': req.body.zipcode,
        'created': req.body.created
    });

    contact.save(function(err){
        if (err) {
            console.log('Error saving contact: ' + err);
            res.json({'error': 'addContact'});
        }

        res.json({
            contact: contact
        });
    });
};

module.exports.getContact = function (req, res) {
   Contact.find({'_id': req.params.id}, function (err, contact) {
       if (err) {
           res.send(err);
       }
       res.json({
           contact: contact
       });

   });


};

module.exports.putContact = function (req, res) {
   var first_name = req.body.first_name;
   var last_name = req.body.last_name;
   var company = req.body.company;
   var phone = req.body.phone;
   var email = req.body.email;
   var address = req.body.address;
   var city = req.body.city;
   var state = req.body.state;
   var zipcode = req.body.zipcode;

   Contact.find({'_id': req.params.id}, function (err, contact) {

      var currentContact = contact[0];


      currentContact['first_name'] = first_name;
      currentContact['last_name'] = last_name;
      currentContact['company'] = company;
      currentContact['phone'] = phone;
      currentContact['email'] = email;
      currentContact['address'] = address;
      currentContact['city'] = city;
      currentContact['state'] = state;
      currentContact['zipcode'] = zipcode;


      currentContact.save(function (err) {
           if (err) {
               console.log('Error editing contact: ' + err);
               res.json({'error': 'putContact'});
           }

           res.json({
               contact: currentContact
           });
       });
   });


};
module.exports.deleteContact = function (req, res) {
    Contact.find({'_id': req.params.id}, function (err, contacts) {
        if (err) {
            res.send(err);
        }

        contacts.forEach(function (contact) {
            //            console.log('Contact found: ' + contact._id);
            contact.remove(function (err, response) {
                if (err) {
                    res.send(err);
                }

                Contact.find({}, function (err, contacts) {
                    if (err) {
                        res.send(err);
                    }

                    res.json({
                        contacts: contacts
                    });
                });
            })
        });
    });
};
