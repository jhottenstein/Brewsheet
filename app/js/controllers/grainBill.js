/*global Grain, GrainBill */
'use strict';

brewsheetApp.controller('GrainBillController',
  function GrainBillController($scope, BeerDesignStore) {

//  function GrainBillController($scope, , GrainBillStore) {

//    $scope.grainBill = GrainBillStore.get();
//
//    $scope.newGrain = new Grain({});
//
    $scope.design = BeerDesignStore.get();
//
//    $scope.$watch('grainBill', function() {
//      GrainBillStore.store();
//    }, true);
//
//    $scope.addGrain = function(){
//      if ($scope.newGrain.isUndefined()) return;
//      $scope.grainBill.add($scope.newGrain);
//      $scope.newGrain = new Grain({});
//    };
//
//    $scope.removeGrain = function(grain){
//      if (grain === undefined) return;
//      $scope.grainBill.remove(grain);
//    };

  }

);
