/*global Hop */
"use strict";

function HopBill(props) {
  var defaults = {bitteringHop: {}, flavorHops: []};
  var propsWithDefaults = angular.extend(defaults, props);

  this.desiredIBUs  = propsWithDefaults.desiredIBUs;
  this.bitteringHop = new Hop(propsWithDefaults.bitteringHop);
  this.flavorHops   = propsWithDefaults.flavorHops.map(function(flavorHop) {
                        return new Hop(flavorHop);
                      });
}

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
