angular.module("config",[]).constant("title","grunt-ng-constant").constant("debug",!0).constant("ENV",{name:"production",api_endpoint:"http://api-chaban-io.herokuapp.com"}),angular.module("instamozappApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","restangular","config","facebook"]).config(["RestangularProvider","ENV",function(a,b){a.setBaseUrl(b.api_endpoint)}]).config(["FacebookProvider",function(a){a.init("599110736865930")}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("instamozappApp").controller("HeaderCtrl",["$scope","Restangular",function(a){a.shareFb=function(){return FB.ui({method:"feed",link:"http://estcequelepontchabanestouvert.fr/#/"},function(){}),!1},a.moveToAbout=function(){$(".main").moveTo(3)}}]).controller("MainCtrl",["$scope","Restangular",function(a,b){function c(a){for(var b=0;b<a.length;b++)a[b].date=moment(a[b].begin).format("D MMMM"),a[b].timeStart=moment(a[b].begin).format("HH[h]mm"),a[b].timeEnd=moment(a[b].end).format("HH[h]mm")}moment.locale("fr"),a.isOpen=!0;var d=moment();$(function(){$(".main").onepage_scroll({sectionContainer:".section",animationTime:500,pagination:!1,updateURL:!1,loop:!0,keyboard:!0,direction:"vertical"})}),a.state="default",b.all("actions/next").getList().then(function(b){a.actions=b,b[0].boatNames=b[0].boatName.split(" - "),b[0].date=moment(b[0].begin).locale("fr").format("D MMMM"),b[0].timeBegin=moment(b[0].begin).format("HH[h]mm"),b[0].timeEnd=moment(b[0].end).format("HH[h]mm"),a.nextBoat=b[0],c(b)}),b.one("actions/statenow").get().then(function(b){if(a.state=b.state,"closed"===b.state){a.isOpen=!1,a.answer="non",a.phrase="Le pont Chaban Delmas est fermé";var c=moment(b.end),e=c.diff(d);console.log(e),a.timeToEndHours=moment.duration(e).get("hours"),a.timeToEndMinutes=moment.duration(e).get("minutes"),a.percentComplete=e/parseInt(b.timeClose)*100,console.log(b.timeClose)}else a.isOpen=!0,a.answer="oui",a.phrase="Le pont Chaban Delams est ouvert";a.begin=b.begin,a.end=b.end,a.boatNames=b.boatNames})}]),angular.module("instamozappApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);