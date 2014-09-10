"use strict";angular.module("instamozappApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","restangular","config"]).config(["RestangularProvider","ENV",function(a,b){a.setBaseUrl(b.api_endpoint)}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("instamozappApp").controller("MainCtrl",["$scope","Restangular",function(a,b){function c(b){var c=moment(),d=c.subtract(3,"days"),e=c.add(3,"days");a.lengthTime=e.diff(d),a.dateStart=d.format("LL"),a.dateEnd=e.format("LL");for(var f=0;f<b.length;f++)b[f].date=moment(b[f].beggin).format("D MMMM"),b[f].timeStart=moment(b[f].beggin).format("HH[h]mm"),b[f].timeEnd=moment(b[f].end).format("HH[h]mm")}moment().locamoment.locale("fr"),$(function(){$(".main").onepage_scroll({sectionContainer:".section",easing:"ease",animationTime:1e3,pagination:!0,updateURL:!0,beforeMove:function(){},afterMove:function(){},loop:!0,keyboard:!0,responsiveFallback:!1,direction:"vertical"})}),a.state="default",b.all("actions").getList().then(function(b){a.actions=b,c(b)}),b.one("actions/statenow").get().then(function(b){if(a.state=b.state,"closed"===b.state){a.isOpen=!1,a.answer="non",a.phrase="Le pont Chaban Delmas est fermé";var c=moment(b.end),d=moment(),e=c.diff(d);console.log(e),a.timeToEndHours=moment.duration(e).get("hours"),a.timeToEndMinutes=moment.duration(e).get("minutes"),a.percentComplete=e/parseInt(b.time_close)*100,console.log(b.time_close)}else a.isOpen=!0,a.answer="oui",a.phrase="Le pont Chaban Delams est ouvert";a.beggin=b.beggin,a.end=b.end,a.boatNames=b.boatNames})}]),angular.module("instamozappApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);