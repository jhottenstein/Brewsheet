/*global Hop, HopBill*/
'use strict';

describe('Hop Bill Controller', function(){
  var design, scope;
  beforeEach(module('brewsheetApp'));
  beforeEach(module(function($provide) {
    design = {
      og: 1.050,
      ibu: 35
    };
    $provide.value('design', design);
  }));

  beforeEach(inject(function($controller, $rootScope) {
    $controller('HopBillController', {$scope: scope = $rootScope});
  }));

  it('should populate values from design service', function() {
    expect(scope.og).toBe(1.050);
    expect(scope.ibu).toBe(35);
  });

  it('should have a hop bill', function () {
    expect(scope.hopBill instanceof HopBill).toBeTruthy();
  });

  it('can add a new hop to the list of flavor hops', function () {
    var hop = new Hop({
      name: 'Flavor Flav',
      amount: 1,
      alphaAcid: 6.1,
      boilTime: 10
    });

    scope.newHop = hop;
    scope.addHop();

    expect(scope.hopBill.flavorHops.length).toBe(1);
    expect(scope.hopBill.flavorHops[0].name).toBe('Flavor Flav');
    expect(scope.hopBill.flavorHops[0].ibus()).toBeCloseTo(8,0);
  });

  it('has an ibu function for the newHop', function () {
    expect(scope.newHop.ibus).toBeDefined();
    scope.addHop();
    expect(scope.newHop.ibus).toBeDefined();
  });
});
