'use strict';

brewsheetApp.controller('HopBillController',
  function HopBillController($scope, design) {
    $scope.og = design.og;
    $scope.ibu = design.ibu;
  }
);
