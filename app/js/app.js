/*global angular*/
'use strict';

// Declare app level module which depends on filters, and services
var brewsheetApp = angular.module('brewsheetApp', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/beer_design', {templateUrl: 'partials/beer_design.html', controller: 'BeerDesignController'});
    $routeProvider.when('/hop_bill', {templateUrl: 'partials/hop_bill.html', controller: 'HopBillController'});
    $routeProvider.when('/grain_bill', {templateUrl: 'partials/grain_bill.html', controller: 'GrainBillController'});
    $routeProvider.otherwise({redirectTo: '/beer_design'});
  }]);
