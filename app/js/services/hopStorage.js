'use strict';

brewsheetApp.factory('hopStorage', function ($rootScope, localStorage) {
  var key = 'hopStorage';
  var hopStorageString = localStorage[key];
  return {hopBill: undefined};
});
