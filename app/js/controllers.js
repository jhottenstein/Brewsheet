'use strict';

/* Controllers */
brewsheetApp.controller('BeerDesignController',
  function BeerDesignController($scope, design) {
    $scope.og = design.og; 
    $scope.ibu = design.ibu; 

    $scope.buGu = function() {
      var gu = ($scope.og - 1) * 1000;
      return ($scope.ibu / gu);
    };
  }
);


brewsheetApp.controller('HopBillController',
  function HopBillController() {
  }
);
