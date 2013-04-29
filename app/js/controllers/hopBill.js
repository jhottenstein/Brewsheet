/*global Hop, HopBill */
'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, design, hopStorage) {

    $scope.hopBill = hopStorage.hopBill; 

    $scope.newHop = new Hop({});

    $scope.ibu = design.ibu;

    $scope.$watch('hopBill', function() {
      hopStorage.store();
    }, true);
    $scope.$watch('design.ibu', function() {
      console.log("yo");
      hopStorage.updateHopBill();
    });

    $scope.addHop = function(){
      if ($scope.newHop.isUndefined()) return;
      $scope.hopBill.add($scope.newHop);
      $scope.newHop = new Hop({});
    };

    $scope.removeHop = function(hop){
      if (hop === undefined) return;
      $scope.hopBill.remove(hop);
    };

  }
);
