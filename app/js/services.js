'use strict';

/* Services */

brewsheetApp.factory('design', function ($rootScope, localStorage) {
  var key = 'beerDesign';
  var designString = localStorage[key];
  var design = designString ? JSON.parse(designString) : {
    og : undefined,
    ibu: undefined
  };

  $rootScope.$watch(function() { return design; }, function() {
    localStorage[key] = JSON.stringify(design);
  }, true);

  return design;
});

// Hook up our localStorage service to the browser's localStorage
brewsheetApp.value('localStorage', window.localStorage);
