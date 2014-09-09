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
    'restangular'
  ])
  .config(function(RestangularProvider) {
    //RestangularProvider.setBaseUrl('http://api-chaban-io.herokuapp.com');
    RestangularProvider.setBaseUrl('http://localhost:1337');
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
