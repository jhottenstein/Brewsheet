/*global Hop*/
'use strict';

describe('Hop Class', function(){
  var hop;
  beforeEach(function(){
    hop = new Hop({name:'Cascade', alphaAcid: 6.3,  boilTime: 60, amount: 1.9});
  });

  it('should assign and expose some properties', function() {
    expect(hop.name).toBe('Cascade');
    expect(hop.alphaAcid).toBe(6.3);
    expect(hop.boilTime).toBe(60);
    expect(hop.amount).toBe(1.9);
  });
  it('should calculate IBUs from alpha acid and amount', function () {
    expect(hop.ibus()).toBeCloseTo(42, 0);
  });

  it('should have a getter for amount', function () {
    expect(hop.getAmount()).toBe(1.9);
  });

  it('should calculate utilization from boil time', function () {
    expect(hop.utilization()).toBeCloseTo(0.289,3);
  });

  it('can tell if it is empty', function () {
    var newHop = new Hop();
    expect(newHop.isUndefined()).toBeTruthy();
    expect(hop.isUndefined()).not.toBeTruthy();
  });

});
