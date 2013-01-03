/*global Hop:false */
"use strict";

function HopBill(desiredIBUs, bitteringHop, _flavorHops){
  var flavorHops = _flavorHops || [];
  this.desiredIBUs = desiredIBUs;
  this.bitteringHop = bitteringHop || new Hop({});
  this.flavorHops = flavorHops;

  function totalIBUsfrom() {
    var totalIbus = 0;
    angular.forEach(flavorHops, function(hop) {
      totalIbus += hop.ibus();
    });
    return totalIbus;
  }

  this.bitteringHop.getAmount = function() {
      var flavorIBUs = totalIBUsfrom(),
          ibusNeeded = desiredIBUs - flavorIBUs,
          alphaAcid = this.alphaAcid,
          utilization = this.utilization(),             //calculate from boil time
          magicNumber = 74.89,         //conversion from oz/gal to mg/L
          batchVolume = 6,              //input on beer design
          boilGravityCorrection = 1.03, //calculate from beer design

          amountNeeded = batchVolume * boilGravityCorrection * ibusNeeded / (alphaAcid * utilization * magicNumber);
      return amountNeeded;
    };
}


