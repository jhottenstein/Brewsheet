'use strict';

/* Services */

brewsheetApp.factory('design', function (localStorage) {
  var key = 'beerDesign';
  var designString = localStorage[key]
  var design = designString ? JSON.parse(designString) : { 
    og : undefined,
    ibu: undefined
  };
  return design;
});

// Hook up our localStorage service to the browser's localStorage
brewsheetApp.value('localStorage', window.localStorage);
