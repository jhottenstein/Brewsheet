'use strict';

brewsheetApp.factory('design', function ($rootScope, localStorage) {
  var key = 'beerDesign';
  var designString = localStorage[key];
  var design = designString ? JSON.parse(designString) : {
    name : undefined,
    style : undefined,
    og : undefined,
    ibu: undefined,
    srm : undefined
  };

  $rootScope.$watch(function() { return design; }, function() {
    localStorage[key] = JSON.stringify(design);
  }, true);

  return design;
});
