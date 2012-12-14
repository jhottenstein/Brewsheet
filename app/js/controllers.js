'use strict';

/* Controllers */
brewsheetApp.controller('BeerDesignController',
  function BeerDesignController($scope, design) {
    //Hook up models to design service
    $scope.og = design.og; 
    $scope.ibu = design.ibu; 

    //figure out how to refactor this
    $scope.$watch(function() { return $scope.og; }, function (ov, nv, scope) {
      design.og = scope.og;
    });

    $scope.$watch(function() { return $scope.ibu; }, function (ov, nv, scope) {
      design.ibu = scope.ibu;
    });

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
