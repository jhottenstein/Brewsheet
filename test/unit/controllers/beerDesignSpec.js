'use strict';

describe('Beer Design Controller', function(){
  var design, scope;

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
  }));

  beforeEach(inject(function($controller, $rootScope) {
    $controller('BeerDesignController', {$scope: scope = $rootScope});
  }));

  it('should be able to calculate BU/GU', function() {
    scope.ibu = 50;
    scope.og = 1.050;
    expect(scope.buGu()).toBeCloseTo(1);
  });

  it('should populate values from design service', function() {
    expect(scope.name).toBe('Crab Creek Amber');
    expect(scope.style).toBe('American Amber Ale');
    expect(scope.og).toBe(1.055);
    expect(scope.ibu).toBe(35);
    expect(scope.srm).toBe(12);
  });

  var expectDesignPropertyToBe = function(property, value) {
    expect(design[property]).not.toBe(value);
    scope[property] = value;
    scope.$digest();
    expect(design[property]).toBe(value);
  };

  it('should update the design when models are changed', function() {
    expectDesignPropertyToBe('name', 'Jasper');
    expectDesignPropertyToBe('style', 'Beer');
    expectDesignPropertyToBe('og', 1);
    expectDesignPropertyToBe('ibu', 1);
    expectDesignPropertyToBe('srm', 1);
  });

});


