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

    // // Add default trigger to the bottom-right corner of the window:
    // //UserVoice.push(['addTrigger', { mode: 'smartvote', trigger_position: 'bottom-right' }]);

    // // Or, use your own custom trigger:
    // UserVoice.push(['addTrigger', '#uservoice', { mode: 'smartvote' }]);

    // // Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
    // UserVoice.push(['autoprompt', {}]);
  })
  .controller('MainCtrl', function ($scope, Restangular) {

    moment.locale('fr');
    $scope.state = 'opened';
    var nowDate = moment();
    //var nowDate = moment('2014-09-17 11:46');

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

    var d = new Date();
    var todaysDate = new Date(d.getTime()); 
    var datenowOneHour = new Date(moment().add(1, 'hours'));

    console.log(todaysDate);
    console.log(datenowOneHour);

    var query = new Parse.Query("Action");
    query.greaterThanOrEqualTo( "begin", todaysDate );
    query.find()
    .then(function(actions){
      console.log(actions[0].get('boatName'))
      $scope.actions = actions;
      actions[0].boatName = actions[0].get('boatName');
      actions[0].boatNames = actions[0].get('boatName').split(' - ');
      actions[0].date = moment(actions[0].get('begin')).locale('fr').format('D MMMM');
      actions[0].timeBegin = moment(actions[0].get('begin')).format('HH[h]mm');
      actions[0].timeEnd = moment(actions[0].get('end')).format('HH[h]mm');
      $scope.nextBoat = actions[0];

      buildTimeline(actions);
    });

    var query = new Parse.Query("Action");
    query.lessThanOrEqualTo( "begin", todaysDate );
    query.greaterThanOrEqualTo( "end", todaysDate );
    query.first()
    .then(function(action){
      console.log(action);
      if (action == undefined) {
        // search on hour
        var query = new Parse.Query("Action");
        query.lessThanOrEqualTo( "begin", datenowOneHour );
        query.greaterThanOrEqualTo( "end", datenowOneHour );
        query.first()
        .then(function(action){
          if (action == undefined) {
            // opened
            
            $scope.state = 'opened';
            $scope.answer = 'oui';
            $scope.phrase = 'Le pont Chaban Delams est ouvert';

          } else {
            // warning
            
            $scope.state = 'warning';
            $scope.answer = 'warning';
            $scope.phrase = 'Le pont Chaban-Delmas est ouvert';
            var endDate = moment(action.get('begin')).zone('0200');
            //var nowDate = moment('2014-09-16 12:12').zone('0200');
            var diffWithEnd = endDate.diff(nowDate);
            $scope.timeCount = moment.utc(diffWithEnd).format('HH[h]mm');

            $scope.percentComplete = 100-(diffWithEnd/parseInt(3600000)*100);

            $scope.begin = action.get('begin');
            $scope.end = action.get('end');
            $scope.boatName = action.get('boatName');
          }

        })
      } else {
        // close
        
        $scope.state = 'closed';
        $scope.answer = 'non';
        $scope.phrase = 'Le pont Chaban-Delmas est fermé';
        var endDate = moment(action.get('end')).zone('0200');
        //var nowDate = moment('2014-09-16 12:12').zone('0200');
        var diffWithEnd = endDate.diff(nowDate);
        $scope.timeCount = moment.utc(diffWithEnd).format('HH[h]mm');

        $scope.percentComplete = 100-(diffWithEnd/parseInt(action.timeClose)*100);

        $scope.begin = action.get('begin');
        $scope.end = action.get('end');
        $scope.boatName = action.get('boatName');
      }
    });

    function buildTimeline(actions) {

      for(var i=0;i<actions.length;i++) {
        actions[i].boatName = actions[i].get('boatName');
        actions[i].date = moment(actions[i].get('begin')).format('D MMMM');
        actions[i].timeStart = moment(actions[i].get('begin')).format('HH[h]mm');
        actions[i].timeEnd = moment(actions[i].get('end')).format('HH[h]mm');
      }
    }

  });
