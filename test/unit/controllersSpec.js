'use strict';

describe('Beer Design Controller', function(){
  var design, scope;

  beforeEach(module('brewsheetApp'));
  beforeEach(module(function($provide) {
    design = {
      og: 1.050,
      ibu: 25
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
      expect(scope.og).toBe(1.050);
      expect(scope.ibu).toBe(25);
  });


});


describe('MyCtrl2', function(){
  it('should ....', function() {
    //spec body
  });
});
