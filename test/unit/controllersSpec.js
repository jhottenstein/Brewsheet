'use strict';

/* jasmine specs for controllers go here */

describe('Beer Design Controller', function(){

  it('should be able to calculate BU/GU', function() {
    var scope = {};
    var ctrl = new BeerDesignController(scope);
    scope.ibu = 50;
    scope.og = 1.050;
    expect(scope.buGu()).toBeCloseTo(1); 
  });

});


describe('MyCtrl2', function(){
  it('should ....', function() {
    //spec body
  });
});
