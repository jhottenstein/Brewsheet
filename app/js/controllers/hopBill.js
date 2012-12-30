'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, design) {
    $scope.og = design.og;
    $scope.ibu = design.ibu;

    $scope.amount = function() {
      var ibusNeeded = design.ibu,
          utilization = 24,             //calculate from boil time
          magicNumber = 0.7489,         //conversion from oz/gal to mg/L
          batchVolume = 6,              //input on beer design
          boilGravityCorrection = 1.03, //calculate from beer design
          amountNeeded = batchVolume * boilGravityCorrection * ibusNeeded / ($scope.alphaAcid * utilization * 0.7489);
      return amountNeeded;
    };
    $scope.ibus = function() {
      var utilization = 24,             //calculate from boil time
          magicNumber = 0.7489,         //?
          batchVolume = 6,              //input on beer design
          boilGravityCorrection = 1.03; //calculate from beer design
      return ($scope.amount() * $scope.alphaAcid * utilization * magicNumber) / (batchVolume * boilGravityCorrection);
      
    };
    
  }
);
