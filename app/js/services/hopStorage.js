'use strict';

brewsheetApp.factory('HopBillService', function (localStorage, design) {
  var key = 'hopStorage2';
  var hopBill;

  return {

    get: function () {
      var hopStorageString = localStorage[key];
      var hopStorage = hopStorageString ? JSON.parse(hopStorageString) : {};
      angular.extend(hopStorage, {desiredIBUs: design.ibu});
      hopBill = new HopBill(hopStorage);
//      hopBill = HopBill.fromJSON(hopStorage, design.ibu);

      return hopBill;
    },
    store: function () {
      localStorage[key] = JSON.stringify(hopBill);
    }
  };
});
