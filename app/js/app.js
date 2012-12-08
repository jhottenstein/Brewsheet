'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/beer_design', {templateUrl: 'partials/beer_design.html', controller: BeerDesignController});
    $routeProvider.when('/hop_bill', {templateUrl: 'partials/hop_bill.html', controller: HopBillController});
    $routeProvider.otherwise({redirectTo: '/beer_design'});
  }]);
