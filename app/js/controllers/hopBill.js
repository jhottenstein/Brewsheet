/*global Hop, HopBill */
'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, design) {

    $scope.hopBill = new HopBill(design.ibu);
    $scope.newHop = new Hop({});

    $scope.og = design.og;
    $scope.ibu = design.ibu;

    $scope.addHop = function(){
    //TODO I hate this API for adding hops
    //I should make a HopCollection class
      $scope.hopBill.flavorHops.push($scope.newHop);
      $scope.newHop = new Hop({});
    };


  }
);
