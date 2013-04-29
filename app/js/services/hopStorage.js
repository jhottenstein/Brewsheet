'use strict';

brewsheetApp.factory('hopStorage', function ($rootScope, localStorage) {
  var key = 'hopStorage';
  var hopStorageString = localStorage[key];
  var hopStorage = hopStorageString ? JSON.parse(hopStorageString) : {} 

  $rootScope.$watch(function() { return hopStorage; }, function() {
    localStorage[key] = JSON.stringify(hopStorage);
  }, true);

  return hopStorage;
});
