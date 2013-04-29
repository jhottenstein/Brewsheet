'use strict';

brewsheetApp.factory('hopStorage', function ($rootScope, localStorage, design) {
  var key = 'hopStorage';
  var hopStorageString = localStorage[key];
  var hopStorage = hopStorageString ? JSON.parse(hopStorageString) : {desiredIBUs:design.ibu} 
  var hopBill = HopBill.fromJSON(hopStorage, design.ibu) 

  return {
    hopBill: hopBill ,
    updateHopBill: function() {
      hopBill.desiredIBUs = design.ibu;
    },
    store: function() {
      localStorage[key] = JSON.stringify(hopBill);
    }
  }
});
