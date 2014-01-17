'use strict';

/* Services */
angular.module('addressBookApp.services', ['angularLocalStorage'])
    .factory('SessionService', function ($http, storage) {
        return {
            saveUserSession: function (data) {
                storage.set('user', data);
            },
            getUserSession: function () {
                return storage.get('user');
            },
            removeUserSession: function () {
                storage.clearAll();
            },
            isUserLoggedIn: function () {
                return storage.get('user') != null;
            },
            saveCurrentContact: function (data) {
                storage.set('contact', data);
            },
            getCurrentContact: function () {
                return storage.get('contact');
            },
            saveCurrentProduct: function (data) {
                storage.set('contact', data);
            },
            getCurrentProduct: function () {
                return storage.get('product');
            },
            saveCurrentAccount: function (data) {
                storage.set('account', data);
            },
            getCurrentAccount: function () {
                return storage.get('account');
            }
        };
    })
    .value('version', '0.1');
