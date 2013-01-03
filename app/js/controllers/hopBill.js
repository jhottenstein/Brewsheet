/*global Hop, HopBill */
'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, design) {

    $scope.hopBill = new HopBill(design.ibu);
    $scope.newHop = new Hop({});

    $scope.og = design.og;
    $scope.ibu = design.ibu;

    $scope.addHop = function(){
      $scope.hopBill.add($scope.newHop);
      $scope.newHop = new Hop({});
    };


  }
);
