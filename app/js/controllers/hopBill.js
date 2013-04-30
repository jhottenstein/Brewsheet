/*global Hop, HopBill */
'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, BeerDesignStore, HopBillStore) {

    $scope.hopBill = HopBillStore.get();

    $scope.newHop = new Hop({});

    $scope.design = BeerDesignStore.get();

    $scope.$watch('hopBill', function() {
      HopBillStore.store();
    }, true);

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
