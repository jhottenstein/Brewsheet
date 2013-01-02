/*global Hop*/
'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, design) {
    //TODO get rid of these default hops
    var bitteringHop = new Hop({});
    var flavorHops = [];

    $scope.flavorHops = flavorHops;
    $scope.bitteringHop = bitteringHop;
    $scope.newHop = new Hop({});

    $scope.og = design.og;
    $scope.ibu = design.ibu;

    $scope.addHop = function(){
    //TODO I hate this API for adding hops
    //I should make a HopCollection class
      $scope.flavorHops.push($scope.newHop);
      $scope.newHop = new Hop({});
    };


    //move to hop object?
    bitteringHop.getAmount = function() {
      function totalIbusfrom(hopCollection) {
        var totalIbus = 0;
        angular.forEach(hopCollection, function(hop) {
          totalIbus += hop.ibus();
        });
        return totalIbus;
      }
      var flavorIbus = totalIbusfrom(flavorHops),
          ibusNeeded = design.ibu - flavorIbus,
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
