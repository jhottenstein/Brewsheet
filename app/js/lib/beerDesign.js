"use strict";
function BeerDesign(props){
  props = props || {};
  this.name = props.name;
  this.style = props.style;
  this.og = props.og;
  this.ibu = props.ibu;
  this.srm = props.srm;
}

BeerDesign.prototype.buGu = function() {
  var gu = (this.og - 1) * 1000;
  return (this.ibu / gu);
};