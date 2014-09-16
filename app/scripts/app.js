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
    'config',
    'facebook'
  ])
  .config(function(RestangularProvider, ENV) {      
    RestangularProvider.setBaseUrl(ENV.api_endpoint);
  })
  .config(function(FacebookProvider) {
     // Set your appId through the setAppId method or
     // use the shortcut in the initialize method directly.
     FacebookProvider.init('599110736865930');
  })
  .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
    }
  ])
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
