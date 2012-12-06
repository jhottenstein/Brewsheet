'use strict';

/* Controllers */


function MyCtrl1($scope) {
  $scope.bu_gu = function() {
    var gu = ($scope.og - 1) * 1000;
    return $scope.ibu / gu;
  };
  
}
//MyCtrl1.$inject = [$scope];


function MyCtrl2() {
}
//MyCtrl2.$inject = [];
