angular.module('ParseServices', [])
.factory('ParseSDK', function() {

  // pro-tip: swap these keys out for PROD keys automatically on deploy using grunt-replace
  Parse.initialize("TMqBPMxbJUxUEAn0xa8qugiHesRgCvLgLSsCjdIm", "mKxjXT3a00umhoKT9ACnigzGdYBfgiUR5UsigbrY");

});