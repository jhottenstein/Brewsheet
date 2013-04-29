'use strict';

brewsheetApp.controller('BeerDesignController',
  function BeerDesignController($scope, design) {
    //Hook up models to design service
    $scope.design = design;

    $scope.$watch(function() { return design; }, function (ov, nv, scope) {
      design = scope.design;
    });

    $scope.buGu = function() {
      var gu = (design.og - 1) * 1000;
      return (design.ibu / gu);
    };
  }
);

