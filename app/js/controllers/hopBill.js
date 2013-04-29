/*global Hop, HopBill */
'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, design, HopBillService) {

    $scope.hopBill = HopBillService.get();

    $scope.newHop = new Hop({});

    $scope.og = design.og;
    $scope.ibu = design.ibu;

    $scope.$watch('hopBill', function() {
      HopBillService.store();
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
