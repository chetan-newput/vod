(function () {
  'use strict';

  angular.module('VOD')
    .controller('HistoryCtrl', ['$scope', '$filter', 'moviesObj', 'historyObj', 'auth', 'posts','appConfig',
      function ($scope, $filter, moviesObj, historyObj, auth, posts, appConfig) {
        $scope.appName = appConfig.name;
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.title = "My History";
        $scope.myhistory = [];
        if (typeof moviesObj != "undefined") {
          if (typeof historyObj != "undefined" && (historyObj.length > 0)) {
            for (var i = 0; i < moviesObj.length; i++) {
              console.log("moviesObj[i] :: ", moviesObj[i]);
              moviesObj[i].find(function (movie) {
                console.log("moviesObj.indexOf(movie.id) :: ", movie.id);
                if (historyObj.indexOf(movie.id) >= 0) {
                  $scope.myhistory.push(movie);
                }
              });
            }
          }
        }
      }
    ]);

})()