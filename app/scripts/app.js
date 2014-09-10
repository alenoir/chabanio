'use strict';

/**
 * @ngdoc overview
 * @name instamozappApp
 * @description
 * # instamozappApp
 *
 * Main module of the application.
 */
angular
  .module('instamozappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'config'
  ])
  .config(function(RestangularProvider, ENV) {      
    RestangularProvider.setBaseUrl(ENV.api_endpoint);
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
