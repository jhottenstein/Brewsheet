'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, design) {
    $scope.og = design.og;
    $scope.ibu = design.ibu;

    $scope.amount = function() {
      var ibusNeeded = design.ibu,
          alphaAcid = $scope.alphaAcid,
          utilization = 24,             //calculate from boil time
          magicNumber = 0.7489,         //conversion from oz/gal to mg/L
          batchVolume = 6,              //input on beer design
          boilGravityCorrection = 1.03, //calculate from beer design
          amountNeeded = batchVolume * boilGravityCorrection * ibusNeeded / (alphaAcid * utilization * magicNumber);
      return amountNeeded;
    };

    $scope.ibus = function() {
      var amount = $scope.amount(),
          alphaAcid = $scope.alphaAcid,
          utilization = 24,             //calculate from boil time
          magicNumber = 0.7489,         //?
          batchVolume = 6,              //input on beer design
          boilGravityCorrection = 1.03, //calculate from beer design
          ibu = (amount * alphaAcid * utilization * magicNumber) / (batchVolume * boilGravityCorrection);
      return ibu;
    };
    
  }
);
