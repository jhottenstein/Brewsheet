/*global Hop, HopBill, element*/
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

  it('has an ibu function for the newHop', function () {
    expect(scope.newHop.ibus).toBeDefined();
    scope.addHop();
    expect(scope.newHop.ibus).toBeDefined();
  });

  it('can add a new hop to the list of flavor hops', function () {
    var hop = new Hop({ name: 'Flavor Flav' });

    scope.newHop = hop;
    scope.addHop();

    expect(scope.hopBill.flavorHops[0]).toBe(hop);
  });

  it('does nothing if trying to add an empty hop', function () {
    scope.newHop = new Hop({});
    scope.addHop();

    expect(scope.hopBill.flavorHops[0]).toBe(undefined);
  });

  it('can remove a hop from the list of flavor hops', function () {
    var hop1 = new Hop({ name: 'Flavor Flav' });
    var hop2 = new Hop({ name: 'Chuck D' });

    scope.newHop = hop1;
    scope.addHop();
    scope.newHop = hop2;
    scope.addHop();
    expect(scope.hopBill.flavorHops.length).toBe(2);
    scope.removeHop(hop1);
    expect(scope.hopBill.flavorHops.length).toBe(1);
  });

  it('does nothing if no hop is given to remove', function () {
    var hop1 = new Hop({ name: 'Flavor Flav' });
    var hop2 = new Hop({ name: 'Chuck D' });
    scope.newHop = hop1;
    scope.addHop();
    scope.newHop = hop2;
    scope.addHop();

    scope.removeHop();
    expect(scope.hopBill.flavorHops.length).toBe(2);
  });

});