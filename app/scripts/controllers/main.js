'use strict';

/**
 * @ngdoc function
 * @name instamozappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the instamozappApp
 */

angular.module('instamozappApp')
  .controller('MainCtrl', function ($scope, Restangular) {
    $(function () {
      $(".main").onepage_scroll({
         sectionContainer: ".section",     // sectionContainer accepts any kind of selector in case you don't want to use section
         easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                          // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
         animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
         pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
         updateURL: true,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
         beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
         afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
         loop: true,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
         keyboard: true,                  // You can activate the keyboard controls
         responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                          // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                          // the browser's width is less than 600, the fallback will kick in.
         direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
      });
    });


    $scope.state = 'default';
    Restangular.all('actions').getList().then(function(actions) {
      $scope.actions = actions;
      buildTimeline(actions);
    });


    Restangular.one('actions/statenow').get().then(function(action) {
      $scope.state = action.state;
      if(action.state === 'closed') {
        $scope.isOpen = false;
        $scope.answer = 'non';
        $scope.phrase = 'Le pont Chaban Delmas est fermé';
        var endDate = moment(action.end);
        var nowDate = moment();
        //var nowDate = moment('2014-10-04 16:12');
        var diffWithEnd = endDate.diff(nowDate);
        console.log(diffWithEnd);
        $scope.timeToEndHours = moment.duration(diffWithEnd).get('hours');
        $scope.timeToEndMinutes = moment.duration(diffWithEnd).get('minutes');

        $scope.percentComplete = diffWithEnd/parseInt(action.time_close)*100;
        console.log(action.time_close);

        // middle brige top (20px to 60px)

        //$scope.topMiddleBridge = 60-(40*$scope.percentComplete);

      }
      else {
        $scope.isOpen = true;
        $scope.answer = 'oui';
        $scope.phrase = 'Le pont Chaban Delams est ouvert';
      }
      $scope.beggin = action.beggin;
      $scope.end = action.end;
      $scope.boatNames = action.boatNames;
    });

    function buildTimeline(actions) {
      var m = moment();
      var dateStart = m.subtract(3, 'days');
      var dateEnd = m.add(3, 'days');
      $scope.lengthTime = dateEnd.diff(dateStart);

      $scope.dateStart = dateStart.format('LL');
      $scope.dateEnd = dateEnd.format('LL');

      for(var i=0;i<actions.length;i++) {
        actions[i].date = moment(actions[i].beggin).format('D MMMM');
        actions[i].timeStart = moment(actions[i].beggin).format('HH[h]mm');
        actions[i].timeEnd = moment(actions[i].end).format('HH[h]mm');
      }
    }
    //console.log($scope.actions);
  });
