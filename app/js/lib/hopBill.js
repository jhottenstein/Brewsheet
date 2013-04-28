/*global Hop */
"use strict";

//TODO clean constructor to just props
function HopBill(desiredIBUs, bitteringHop, flavorHops, props) {
  props = props || {};
  this.desiredIBUs  = props.desiredIBUs || desiredIBUs;
  this.bitteringHop = bitteringHop || new Hop(props.bitteringHop || {});
  this.flavorHops   = flavorHops ||
                      props.flavorHops && props.flavorHops.map(function(flavorHop) {
                        return new Hop(flavorHop);
                      }) ||
                      [];
}

HopBill.fromJSON = function(json) {
  var oldHopBill = JSON.parse(json);
  var newHopBill = new HopBill(null, null, null, oldHopBill);
  return newHopBill;
};

(function (hopBillPrototype){
  hopBillPrototype.add = function(newHop) {
    this.flavorHops.push(newHop);
  };

  hopBillPrototype.remove = function(hop) {
    this.flavorHops.splice(this.flavorHops.indexOf(hop), 1);
  };

  hopBillPrototype.totalFlavorIBUs = function () {
    var totalIbus = 0;
    angular.forEach(this.flavorHops, function(hop) {
      totalIbus += hop.ibus();
    });
    return totalIbus;
  };

  hopBillPrototype.getBitteringHopIbus = function () {
    var bitteringHop = this.bitteringHop,
        bitteringHopAmount = this.getBitteringHopAmount();

    bitteringHop.getAmount = function () { return bitteringHopAmount; };
    return bitteringHop.ibus();
  };

  hopBillPrototype.getBitteringHopAmount = function() {
      var flavorIBUs = this.totalFlavorIBUs(),
          ibusNeeded = this.desiredIBUs - flavorIBUs,
          alphaAcid = this.bitteringHop.alphaAcid,
          utilization = this.bitteringHop.utilization(),             //calculate from boil time
          magicNumber = 74.89,         //conversion from oz/gal to mg/L
          batchVolume = 6,              //input on beer design
          boilGravityCorrection = 1.03, //calculate from beer design

          amountNeeded = batchVolume * boilGravityCorrection * ibusNeeded / (alphaAcid * utilization * magicNumber);
      return amountNeeded;
    };
}(HopBill.prototype));
