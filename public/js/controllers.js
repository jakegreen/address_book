'use strict';

/* Controllers */

angular.module('addressBookApp.controllers', [])
    .controller('BaseController', ['$scope', '$location', '$window', 'Restangular', 'SessionService', function($scope, $location, $window, Restangular, SessionService) {
        $scope.userSession = SessionService.getUserSession();

        $scope.isActive = function(viewLocation) {
            if (typeof viewLocation == "object") {
                var active = false;
                for (var i = 0; i < viewLocation.length; i++) {
                    if (viewLocation[i] == $location.path()) {
                        active = true;
                    }
                }
                return active;
            } else {
                return viewLocation == $location.path();
            }
        };

        $scope.doLogout = function() {
            Restangular.one('account/logout').post()
                .then(function(data) {
                    SessionService.removeUserSession();
                    $window.location = '/';
                }), function(response) {
                $scope.message = response;
            };
        };
    }])
    .controller('LoginController', ['$scope', '$window', 'loginTitle', 'Restangular', 'SessionService', function($scope, $window, loginTitle, Restangular, SessionService) {
        $scope.user = {}

        $scope.register = function() {
            $window.location = '/register';
        }

        $scope.doLogin = function() {
            console.log('Logging in user: ' + $scope.user.email);
            var user = {
                'email': $scope.user.email,
                'password': $scope.user.password
            };

            Restangular.all('account/login').customPOST(user)
                .then(function(data) {
                    if (data == 'Unauthorized') {
                        $scope.errorMessage = 'Invalid username and/or password';
                    } else {
                        SessionService.saveUserSession(data);
                        $scope.userSession = data;
                        $window.location = '/home';
                    }
                }), function(response) {
                $scope.errorMessage = response;
            };
        }

        $scope.hasError = function(field, validation) {
            if (validation) {
                return $scope.loginForm[field].$dirty && $scope.loginForm[field].$error[validation];
            }
            return $scope.loginForm[field].$dirty && $scope.loginForm[field].$invalid;
        };

        $scope.loginTitle = loginTitle;
    }])
    .controller('IndexController', ['$scope', '$http', function($scope, $http) {

    }])
    .controller('RegisterController', ['$scope', '$window', 'registerConstants', 'Restangular', 'SessionService', function($scope, $window, registerConstants, Restangular, SessionService) {
        $scope.user = {}

        $scope.doRegister = function() {
            var user = {
                'email': $scope.user.email,
                'password': $scope.user.password,
                'username': $scope.user.email,
                'created': new Date(),
                'first_name': $scope.user.first_name,
                'last_name': $scope.user.last_name
            };

            Restangular.all('account/register').customPOST(user)
                .then(function(data) {
                    SessionService.saveUserSession(data);
                    $window.location = '/home';
                }), function(response) {
                console.log('Register error: ' + response);
                $scope.errorMessage = response;
            };
        }

        $scope.hasError = function(field, validation) {
            if (validation) {
                return $scope.registerForm[field].$dirty && $scope.registerForm[field].$error[validation];
            }

            return $scope.registerForm[field].$dirty && $scope.registerForm[field].$invalid;
        };

        $scope.registerTitle = registerConstants['title'];
        $scope.registerSubTitle = registerConstants['subTitle'];
    }])
    .controller('ContactController', ['$scope', 'Restangular', 'SessionService', function($scope, Restangular, SessionService) {
        Restangular.all('api/contacts').customGET()
            .then(function(data) {
                $scope.contacts = data.contacts;
            }), function(response) {
            console.log("Error retrieving contacts: " + response);
        };

        $scope.contact = SessionService.getCurrentContact();
    }])
    .controller('AddContactController', ['$scope', '$window', 'contactConstants', 'Restangular', 'SessionService', function($scope, $window, contactConstants, Restangular, SessionService) {
        $scope.contact = {}

        $scope.addContact = function() {
            var contact = {
                'first_name': $scope.contact.first_name,
                'last_name': $scope.contact.last_name,
                'phone': $scope.contact.phone,
                'email': $scope.contact.email,
                'address': $scope.contact.address,
                'city': $scope.contact.city,
                'state': $scope.contact.state,
                'zipcode': $scope.contact.zipcode,
                'created': new Date()
            };

            Restangular.all('api/contact').customPOST(contact)
                .then(function(data) {
                    SessionService.saveCurrentContact(data.contact);
                    $window.location = '/contacts';
                }), function(response) {
                $scope.errorMessage = response;
            };
        };

        $scope.hasError = function(field, validation) {
            if (validation) {
                return $scope.contactForm[field].$dirty && $scope.contactForm[field].$error[validation];
            }

            return $scope.contactForm[field].$dirty && $scope.contactForm[field].$invalid;
        };

        $scope.contactTitle = contactConstants['title'];
        $scope.contactSubTitle = contactConstants['subTitle'];
    }])
    .controller('ProductController', ['$scope', '$window', 'Restangular', 'SessionService', function ($scope, Restangular, SessionService) {
        Restangular.all('api/products').customGET()
            .then(function(data) {
                $scope.products = data.products;
            }), function(response) {
            console.log("Error retrieving products: " + response);
        };

        $scope.addProduct = function() {
            var contact = {
                'product_name': $scope.contact.product_name,
                'description': $scope.contact.description,
                'price': $scope.contact.price
            };

            Restangular.all('api/contact').customPOST(contact)
                .then(function(data) {
                    SessionService.saveCurrentProduct(data.Product);
                    $window.location = '/products';
                }), function(response) {
                $scope.errorMessage = response;
            };
        };

        $scope.hasError = function(field, validation) {
            if (validation) {
                return $scope.productForm[field].$dirty && $scope.productForm[field].$error[validation];
            }

            return $scope.productForm[field].$dirty && $scope.productForm[field].$invalid;
        };

        $scope.product = SessionService.getCurrentProduct();
    }]);