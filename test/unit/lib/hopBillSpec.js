/*global Hop, HopBill*/
'use strict';

describe('Hop Class', function(){
  var hopBill, bitteringHop, flavorHop;
  beforeEach(function(){
    bitteringHop = new Hop({name:'Cascade', alphaAcid: 6.3,  boilTime: 60});
    flavorHop = new Hop({name:'Citra', alphaAcid: 12.3,  boilTime: 30, amount: 0.5});
  });

  it('should assign and expose some properties', function() {
    hopBill = new HopBill(35, bitteringHop, [flavorHop]);
    expect(hopBill.bitteringHop).toBe(bitteringHop);
    expect(hopBill.flavorHops[0]).toBe(flavorHop);
  });

  it('should have a bittering hop', function () {
    hopBill = new HopBill();
    expect(hopBill.bitteringHop instanceof Hop).toBeTruthy();
  });

  it('should have a flavor hop', function () {
    hopBill = new HopBill(35, bitteringHop, [flavorHop]);
    expect(hopBill.flavorHops instanceof Array).toBeTruthy();
    expect(hopBill.flavorHops[0] instanceof Hop).toBeTruthy();
  });

  it('should be able to add flavorHops', function () {
    hopBill = new HopBill();
    hopBill.add(flavorHop);
    expect(hopBill.flavorHops[0]).toBe(flavorHop);
  });

  it('should be able to remove flavorHops', function () {
    hopBill = new HopBill();
    hopBill.add(flavorHop);
    hopBill.add(bitteringHop);
    expect(hopBill.flavorHops[1]).toBe(bitteringHop);
    hopBill.remove(bitteringHop);
    expect(hopBill.flavorHops.indexOf(bitteringHop)).toBe(-1);
  });

  it('should be able to calculate ibus from flavor hops', function () {
    hopBill = new HopBill();
    expect(hopBill.totalFlavorIBUs()).toBe(0);
    hopBill.add(flavorHop);
    expect(hopBill.totalFlavorIBUs()).toBeCloseTo(16.5,1);
  });

  it('should calculate amount of bittering hops needed', function () {
    hopBill = new HopBill(35, bitteringHop, []);
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(1.6, 1);
  });

  it('should calculate amount of IBUs from bittering hops', function () {
    hopBill = new HopBill(35, bitteringHop, []);
    expect(hopBill.getBitteringHopIbus()).toBeCloseTo(35, 0);
    hopBill.add(flavorHop);
    expect(hopBill.getBitteringHopIbus()).toBeCloseTo(18, 0);
  });

  it('should calculate amount of bittering hops needed when there are flavor hops', function () {
    hopBill = new HopBill(35, bitteringHop, [flavorHop]);
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(0.8, 1);
  });

  it('should adjust amount of bittering hops needed when flavor hops are added', function () {
    hopBill = new HopBill(35, bitteringHop, []);
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(1.6, 1);
    hopBill.add(flavorHop);
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(0.8, 1);
  });

  it('should adjust amount of bittering hops needed when flavor hops are removed', function () {
    hopBill = new HopBill(35, bitteringHop, [flavorHop]);
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(0.8, 1);
    hopBill.remove(flavorHop);
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(1.6, 1);
  });
});
