'use strict';

/**
 * @ngdoc function
 * @name instamozappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the instamozappApp
 */
angular.module('instamozappApp')
  .controller('MainCtrl', function ($scope, $http) {
    console.log(require('cheerio').load('<div ng-include="\'views/main.html\'"></div>').html());

  });
