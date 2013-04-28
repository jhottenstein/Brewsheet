/*global Hop, HopBill*/
'use strict';

describe('Hop Class', function(){
  var hopBill, bitteringHop, flavorHop;
  beforeEach(function(){
    bitteringHop = new Hop({name:'Cascade', alphaAcid: 6.3,  boilTime: 60});
    flavorHop = new Hop({name:'Citra', alphaAcid: 12.3,  boilTime: 30, amount: 0.5});
  });

  it('should assign and expose some properties', function() {
    hopBill = new HopBill({desiredIBUs: 35, bitteringHop: bitteringHop, flavorHops: [flavorHop]});
    expect(hopBill.bitteringHop).toEqual(bitteringHop);
    expect(hopBill.flavorHops[0]).toEqual(flavorHop);
  });

  it('should have a bittering hop', function () {
    hopBill = new HopBill();
    expect(hopBill.bitteringHop instanceof Hop).toBeTruthy();
  });

  it('should have a flavor hop', function () {
    hopBill = new HopBill({desiredIBUs: 35, bitteringHop: bitteringHop, flavorHops: [flavorHop]});
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
    hopBill = new HopBill({desiredIBUs: 35, bitteringHop: bitteringHop, flavorHops: []});
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(1.6, 1);
  });

  it('should calculate amount of IBUs from bittering hops', function () {
    hopBill = new HopBill({desiredIBUs: 35, bitteringHop: bitteringHop, flavorHops: []});
    expect(hopBill.getBitteringHopIbus()).toBeCloseTo(35, 0);
    hopBill.add(flavorHop);
    expect(hopBill.getBitteringHopIbus()).toBeCloseTo(18, 0);
  });

  it('should calculate amount of bittering hops needed when there are flavor hops', function () {
    hopBill = new HopBill({desiredIBUs: 35, bitteringHop: bitteringHop, flavorHops: [flavorHop]});
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(0.8, 1);
  });

  it('should adjust amount of bittering hops needed when flavor hops are added', function () {
    hopBill = new HopBill({desiredIBUs: 35, bitteringHop: bitteringHop, flavorHops: []});
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(1.6, 1);
    hopBill.add(flavorHop);
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(0.8, 1);
  });

  it('should adjust amount of bittering hops needed when flavor hops are removed', function () {
    hopBill = new HopBill({desiredIBUs: 35, bitteringHop: bitteringHop, flavorHops: [flavorHop]});
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(0.8, 1);
    hopBill.remove(flavorHop);
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(1.6, 1);
  });

  it('should work as used in the controller', function () {
    hopBill  = new HopBill({desiredIBUs: 35});
    var hop = hopBill.bitteringHop;
    hop.name = bitteringHop.name;
    hop.alphaAcid = bitteringHop.alphaAcid;
    hop.boilTime = bitteringHop.boilTime;

    expect(hopBill.bitteringHop).toEqual(bitteringHop);
    expect(hopBill.bitteringHop.name).toEqual(bitteringHop.name);
    expect(hopBill.getBitteringHopAmount()).toBeCloseTo(1.6, 1);

  });

  it('should deserialize a JSON string of a Hop Bill', function () {
    var stringifiedHopBill = '{"desiredIBUs":35,"bitteringHop":{"name":"Cascade","alphaAcid":6.3,"boilTime":60},"flavorHops":[{"name":"Citra","alphaAcid":12.3,"boilTime":30,"amount":0.5}]}';
    expect(JSON.stringify(bitteringHop)).toEqual('{"name":"Cascade","alphaAcid":6.3,"boilTime":60}');
    hopBill = HopBill.fromJSON(stringifiedHopBill);
    expect(hopBill.desiredIBUs).toBe(35);
    expect(hopBill.bitteringHop).toEqual(new Hop({name:'Cascade',alphaAcid:6.3,boilTime:60}));
    expect(hopBill.flavorHops).toEqual([new Hop({'name':'Citra','alphaAcid':12.3,'boilTime':30,'amount':0.5})]);
  });

 it('should have behavior on deserialized hop bill', function () {
    var stringifiedHopBill = '{"desiredIBUs":35,"bitteringHop":{"name":"Cascade","alphaAcid":6.3,"boilTime":60},"flavorHops":[{"name":"Citra","alphaAcid":12.3,"boilTime":30,"amount":0.5}]}';
    hopBill = HopBill.fromJSON(stringifiedHopBill);
    expect(hopBill.add).toBeDefined();
    expect(hopBill.bitteringHop.getAmount).toBeDefined();
    expect(hopBill.flavorHops[0].getAmount).toBeDefined();
  });
});
