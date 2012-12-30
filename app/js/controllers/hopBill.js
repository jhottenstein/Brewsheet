/*global Hop*/
'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, design) {

    $scope.og = design.og;
    $scope.ibu = design.ibu;

    $scope.flavorHops = [
      new Hop({name:'Cascade', alphaAcid: 7.3,  boilTime: 45})
    ];
    $scope.bitteringHop = new Hop({name:'Cascade', alphaAcid: 6.1,  boilTime: 60});

    //move to hop object?
    $scope.bitteringHop.getAmount = function() {
      var ibusNeeded = design.ibu, //- $scope.flavorHops[0].ibus(),
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
