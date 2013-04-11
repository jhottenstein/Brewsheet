'use strict';

brewsheetApp.factory('hopStorage', function ($rootScope, localStorage) {
  var key = 'hopStorage';
  var hopStorageString = localStorage[key];

  var hopBill = {hopBill: undefined};

  $rootScope.$watch(function() { return hopBill; }, function() {
    localStorage[key] = JSON.stringify(hopBill);
  }, true);

  return hopBill;
});
