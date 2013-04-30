/*global BeerDesign*/
'use strict';

brewsheetApp.factory('design', function ($rootScope, localStorage) {
  var key = 'beerDesign';
  var designString = localStorage[key];
  var design = designString ? JSON.parse(designString) : new BeerDesign();

  $rootScope.$watch(function() { return design; }, function() {
    localStorage[key] = JSON.stringify(design);
  }, true);

  return design;
});
