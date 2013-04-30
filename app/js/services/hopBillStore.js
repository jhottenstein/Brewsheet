/*global HopBill */
'use strict';

brewsheetApp.factory('HopBillStore', function (localStorage, BeerDesignStore) {
  var LOCAL_STORAGE_KEY = 'hopBill';
  var hopBill;

  return {

    get: function () {
      var hopStorageString = localStorage[LOCAL_STORAGE_KEY];
      var hopStorage = hopStorageString ? JSON.parse(hopStorageString) : {};
      angular.extend(hopStorage, {desiredIBUs: BeerDesignStore.get().ibu});
      hopBill = new HopBill(hopStorage);

      return hopBill;
    },
    store: function () {
      localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(hopBill);
    }
  };
});
