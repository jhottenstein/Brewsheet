/*global Hop*/
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

  it('should have a bittering hop', function () {
    expect(scope.bitteringHop instanceof Hop).toBeTruthy();
  });

  it('should calculate amount of bittering hops needed', function () {
    scope.bitteringHop.alphaAcid = 6.3;
    expect(scope.bitteringHop.getAmount()).toBeCloseTo(1.9, 1);
  });
  
  it('should have flavor hops', function () {
    var hop = new Hop({
      name: 'Flavor Flav',
      amount: 1,
      alphaAcid: 6.1,
      boilTime: 1
    });
    scope.newHop = hop;
    scope.addHop();

    expect(scope.flavorHops instanceof Array).toBeTruthy();
    expect(scope.flavorHops[0] instanceof Hop).toBeTruthy();
  });

  it('should calculate amount of bittering hops needed when there are flavor hops', function () {
    var hop = new Hop({
      name: 'Flavor Flav',
      amount: 1,
      alphaAcid: 6.1,
      boilTime: 1
    });
    scope.newHop = hop;
    scope.addHop();

    scope.bitteringHop.alphaAcid = 6.3;
    expect(scope.bitteringHop.getAmount()).toBeCloseTo(0.9, 1);
  });
  
  it('can add a new hop to the list of flavor hops', function () {
    var hop = new Hop({
      name: 'Flavor Flav',
      amount: 1,
      alphaAcid: 6.1,
      boilTime: 1
    });

    scope.newHop = hop;
    scope.addHop();

    expect(scope.flavorHops.length).toBe(1);
    expect(scope.flavorHops[0].name).toBe('Flavor Flav');
    expect(scope.flavorHops[0].ibus()).toBeCloseTo(18,0);
  });

  it('has an ibu function for the newHop', function () {
    expect(scope.newHop.ibus).toBeDefined();
    scope.addHop();
    expect(scope.newHop.ibus).toBeDefined();
  });
});
