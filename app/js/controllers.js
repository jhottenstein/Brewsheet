'use strict';

/* Controllers */


function BeerDesignController($scope) {
  $scope.buGu = function() {
    var gu = ($scope.og - 1) * 1000;
    return ($scope.ibu / gu);
  };
  
}
//BeerDesignController.$inject = [$scope];


function HopBillController() {
}
//MyCtrl2.$inject = [];
