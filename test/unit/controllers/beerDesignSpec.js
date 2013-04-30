/*global BeerDesign, spyOn */
'use strict';

describe('Beer Design Controller', function(){
  var design, scope;
  var mockBeerDesign, mockStore;

  beforeEach(module('brewsheetApp'));
  beforeEach(module(function($provide) {
    design = {
      name: 'Crab Creek Amber',
      style: 'American Amber Ale',
      og: 1.055,
      ibu: 35,
      srm: 12
    };
    $provide.value('design', design);
    mockBeerDesign = new BeerDesign(design);
    mockStore = {
      get: function () {
        return mockBeerDesign;
      },
      store: function () {
      }
    };
    spyOn(mockStore, 'store');
    $provide.value('BeerDesignStore', mockStore);

  }));

  beforeEach(inject(function($controller, $rootScope) {
    $controller('BeerDesignController', {$scope: scope = $rootScope});
  }));

  it('should populate beerDesign from BeerDesignStore service', function () {
    expect(scope.design).toBe(mockBeerDesign);
  });

  it('should update the HopBillStore service when hopBill is changed', function () {
    expect(scope.design.ibu).not.toBe(50);
    scope.design.ibu = 35;
    scope.$digest();

    expect(mockStore.store).toHaveBeenCalled();
  });

});


