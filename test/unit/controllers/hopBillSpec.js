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

  it('should have flavor hops', function () {
    expect(scope.flavorHops instanceof Array).toBeTruthy();
    expect(scope.flavorHops[0] instanceof Hop).toBeTruthy();
  });

  it('should calculate amount of bittering hops needed', function () {
    scope.bitteringHop.alphaAcid = 6.3;
    expect(scope.bitteringHop.getAmount()).toBeCloseTo(1.9, 1);
  });
});
