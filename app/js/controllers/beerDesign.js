'use strict';

brewsheetApp.controller('BeerDesignController',
  function BeerDesignController($scope, design) {
    //Hook up models to design service
    $scope.name = design.name;
    $scope.style = design.style;
    $scope.og = design.og;
    $scope.ibu = design.ibu;
    $scope.srm = design.srm;

    //figure out how to refactor this
    $scope.$watch(function() { return $scope.name; }, function (ov, nv, scope) {
      design.name = scope.name;
    });

    $scope.$watch(function() { return $scope.style; }, function (ov, nv, scope) {
      design.style = scope.style;
    });

    $scope.$watch(function() { return $scope.og; }, function (ov, nv, scope) {
      design.og = scope.og;
    });

    $scope.$watch(function() { return $scope.ibu; }, function (ov, nv, scope) {
      design.ibu = scope.ibu;
    });

    $scope.$watch(function() { return $scope.srm; }, function (ov, nv, scope) {
      design.srm = scope.srm;
    });

    $scope.buGu = function() {
      var gu = ($scope.og - 1) * 1000;
      return ($scope.ibu / gu);
    };
  }
);

