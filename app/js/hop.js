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

  hopPrototype.utilization = function() {
    //From http://www.realbeer.com/hops/research.html with local modification
    return (1 - Math.exp(-0.04 * this.boilTime)) / 3.15;
  };

  hopPrototype.ibus = function() {
    var amount = this.getAmount(),
        alphaAcid = this.alphaAcid,
        utilization = this.utilization(), 
        magicNumber = 74.89,         // g/L -> oz/gal
        batchVolume = 6,              //input on beer design
        boilGravityCorrection = 1.03, //calculate from beer design
        ibus = (amount * alphaAcid * utilization * magicNumber) / (batchVolume * boilGravityCorrection);
    return ibus;
  };
}(Hop.prototype));
