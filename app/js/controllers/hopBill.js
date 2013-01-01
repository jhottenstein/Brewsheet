/*global Hop*/
'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, design) {
    //TODO get rid of these default hops
    var bitteringHop = new Hop({name:'Cascade', alphaAcid: 6.1,  boilTime: 60});
    var flavorHops =[
      new Hop({name:'Cascade', alphaAcid: 7.3,  boilTime: 45})
    ];
    $scope.flavorHops = flavorHops;
    $scope.bitteringHop = bitteringHop;

    $scope.og = design.og;
    $scope.ibu = design.ibu;


    //move to hop object?
    bitteringHop.getAmount = function() {
      var ibusNeeded = design.ibu - flavorHops[0].ibus(),
          alphaAcid = $scope.bitteringHop.alphaAcid,
          utilization = 24,             //calculate from boil time
          magicNumber = 0.7489,         //conversion from oz/gal to mg/L
          batchVolume = 6,              //input on beer design
          boilGravityCorrection = 1.03, //calculate from beer design
          amountNeeded = batchVolume * boilGravityCorrection * ibusNeeded / (alphaAcid * utilization * magicNumber);
      return amountNeeded;
    };
  }
);
