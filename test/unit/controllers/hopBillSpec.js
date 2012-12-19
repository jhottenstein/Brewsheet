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

  it('should calculate amount of bittering hops needed', function () {
    scope.alphaAcid = 6.3;
//    scope.boilTime = 60;

    expect(scope.amount()).toBeCloseTo(1.9, 1);
  });
});
