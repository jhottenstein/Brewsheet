/*global Hop */
"use strict";

function HopBill(_desiredIBUs, _bitteringHop, _flavorHops){
  var flavorHops   = this.flavorHops   = _flavorHops || [];
  var desiredIBUs  = this.desiredIBUs  = _desiredIBUs;
  var bitteringHop = this.bitteringHop = _bitteringHop || new Hop({});

  function totalFlavorIBUs() {
    var totalIbus = 0;
    angular.forEach(flavorHops, function(hop) {
      totalIbus += hop.ibus();
    });
    return totalIbus;
  }

  bitteringHop.getAmount = function() {
      var flavorIBUs = totalFlavorIBUs(),
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
(function (hopBillPrototype){
  hopBillPrototype.add = function(newHop) {
    this.flavorHops.push(newHop);
  };

}(HopBill.prototype));
