/*global BeerDesign*/
'use strict';

brewsheetApp.factory('BeerDesignStore', function (localStorage) {
  var key = 'beerDesign';
  var beerDesign;

  return {

    get: function () {
      var designString = localStorage[key];
      var designObject = designString ? JSON.parse(designString) : {};
      beerDesign = new BeerDesign(designObject);

      return beerDesign;
    },
    store: function () {
      localStorage[key] = JSON.stringify(beerDesign);
    }
  };
});
