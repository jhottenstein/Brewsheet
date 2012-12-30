"use strict";
//TODO amount vs getAmount()
function Hop(props){
  this.name = props.name;
  this.alphaAcid = props.alphaAcid;
  this.boilTime = props.boilTime;
  this.amount = props.amount;
}

(function (hopPrototype) {
  hopPrototype.getAmount = function() {
    return this.amount;
  };
  hopPrototype.ibus = function() {
    var amount = this.getAmount(),
        alphaAcid = this.alphaAcid,
        utilization = 24,             //calculate from boil time
        magicNumber = 0.7489,         //?
        batchVolume = 6,              //input on beer design
        boilGravityCorrection = 1.03, //calculate from beer design
        ibus = (amount * alphaAcid * utilization * magicNumber) / (batchVolume * boilGravityCorrection);
    return ibus;
  };
}(Hop.prototype));
