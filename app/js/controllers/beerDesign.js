'use strict';

brewsheetApp.controller('BeerDesignController',
  function BeerDesignController($scope, BeerDesignStore) {
    $scope.design = BeerDesignStore.get();

    $scope.$watch('design', function (ov, nv, scope) {
      BeerDesignStore.store();
    }, true);
  }
);

