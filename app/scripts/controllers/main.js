'use strict';

/**
 * @ngdoc function
 * @name instamozappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the instamozappApp
 */

angular.module('instamozappApp')
  .controller('HeaderCtrl', function ($scope) {


  })
  .controller('FooterCtrl', function ($scope) {

    UserVoice.push(['set', {
      accent_color: '#808283',
      trigger_color: 'white',
      trigger_background_color: 'rgba(46, 49, 51, 0.6)'
    }]);

    // Identify the user and pass traits
    // To enable, replace sample data with actual user traits and uncomment the line
    UserVoice.push(['identify', {
      //email:      'john.doe@example.com', // User’s email address
      //name:       'John Doe', // User’s real name
      //created_at: 1364406966, // Unix timestamp for the date the user signed up
      //id:         123, // Optional: Unique id of the user (if set, this should not change)
      //type:       'Owner', // Optional: segment your users by type
      //account: {
      //  id:           123, // Optional: associate multiple users with a single account
      //  name:         'Acme, Co.', // Account name
      //  created_at:   1364406966, // Unix timestamp for the date the account was created
      //  monthly_rate: 9.99, // Decimal; monthly rate of the account
      //  ltv:          1495.00, // Decimal; lifetime value of the account
      //  plan:         'Enhanced' // Plan name for the account
      //}
    }]);

    // Add default trigger to the bottom-right corner of the window:
    //UserVoice.push(['addTrigger', { mode: 'smartvote', trigger_position: 'bottom-right' }]);

    // Or, use your own custom trigger:
    UserVoice.push(['addTrigger', '#uservoice', { mode: 'smartvote' }]);

    // Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
    UserVoice.push(['autoprompt', {}]);
  })
  .controller('MainCtrl', function ($scope, Restangular) {
    moment.locale('fr');
    $scope.isOpen = true;
    var nowDate = moment();
    //var nowDate = moment('2014-10-04 16:12');

    $(function () {
      $('.main').onepage_scroll({
         sectionContainer: '.section',
         animationTime: 500, 
         pagination: false,
         updateURL: false,
         loop: false,
         keyboard: true,
         direction: 'vertical',
         responsiveFallback: 600
      });
    });

    $scope.state = 'default';
    Restangular.all('actions/next').getList().then(function(actions) {
      $scope.actions = actions;
      actions[0].boatNames = actions[0].boatName.split(' - ');
      actions[0].date = moment(actions[0].begin).locale('fr').format('D MMMM');
      actions[0].timeBegin = moment(actions[0].begin).format('HH[h]mm');
      actions[0].timeEnd = moment(actions[0].end).format('HH[h]mm');
      $scope.nextBoat = actions[0];

      buildTimeline(actions);
    });


    Restangular.one('actions/statenow').get().then(function(action) {
      $scope.state = action.state;
      if(action.state === 'closed') {
        $scope.isOpen = false;
        $scope.answer = 'non';
        $scope.phrase = 'Le pont Chaban-Delmas est fermé';
        var endDate = moment(action.end).zone('0200');
        //var nowDate = moment('2014-09-16 12:12').zone('0200');
        var diffWithEnd = endDate.diff(nowDate);
        console.log(action.end);
        $scope.timeCount = moment.utc(diffWithEnd).format('HH[h]mm');

        $scope.percentComplete = 100-(diffWithEnd/parseInt(action.timeClose)*100);
        console.log(action.timeClose);

        // middle brige top (20px to 60px)

        //$scope.topMiddleBridge = 60-(40*$scope.percentComplete);

      }
      else {
        $scope.isOpen = true;
        $scope.answer = 'oui';
        $scope.phrase = 'Le pont Chaban Delams est ouvert';
      }
      $scope.begin = action.begin;
      $scope.end = action.end;
      $scope.boatNames = action.boatNames;
    });

    function buildTimeline(actions) {

      for(var i=0;i<actions.length;i++) {
        actions[i].date = moment(actions[i].begin).format('D MMMM');
        actions[i].timeStart = moment(actions[i].begin).format('HH[h]mm');
        actions[i].timeEnd = moment(actions[i].end).format('HH[h]mm');
      }
    }

    //console.log($scope.actions);
  });
