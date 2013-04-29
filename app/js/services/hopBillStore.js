/*global HopBill */
'use strict';

brewsheetApp.factory('HopBillStore', function (localStorage, design) {
  var key = 'hopStorage';
  var hopBill;

  return {

    get: function () {
      var hopStorageString = localStorage[key];
      var hopStorage = hopStorageString ? JSON.parse(hopStorageString) : {};
      angular.extend(hopStorage, {desiredIBUs: design.ibu});
      hopBill = new HopBill(hopStorage);

      return hopBill;
    },
    store: function () {
      localStorage[key] = JSON.stringify(hopBill);
    }
  };
});
