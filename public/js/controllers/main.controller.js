(function () {
  'use strict';

  angular.module('VOD')
    .controller('MainCtrl', ['$scope', '$filter', 'promiseObj', 'auth', 'posts','appConfig',
      function ($scope, $filter, promiseObj, auth, posts, appConfig) {
        $scope.posts = [];
        $scope.appName = appConfig.name;
        $scope.typeOptions = [{
            name: 'Publish',
            value: 'publish'
          },
          {
            name: 'Draft',
            value: 'draft'
          }
        ];

        $scope.status = 'publish';

        $scope.categories = [];
        $scope.category = $scope.categories['0'] || "";
        $scope.addCategory = function () {
          console.log("Add category initialize");
        };

        if (typeof promiseObj != "undefined") {
          $scope.posts = promiseObj;
        }
        //$scope.posts = posts.posts;	
        $scope.isLoggedIn = auth.isLoggedIn;
        //setting title to blank here to prevent empty posts
        $scope.title = 'Home';

        $scope.created = $filter('date')(Date.now(), 'dd-MM-yyyy');

        $scope.current_movie = null;

        $scope.select_movie = function (id) {
          $scope.posts.forEach(function (entry) {
            for (var i = 0; i < entry.length; i++) {
              if (entry[i].hasOwnProperty("id") && entry[i]["id"] === id) {
                $scope.current_movie = entry[i];
                posts.addToUserHistory({
                  "id": entry[i]["id"]
                });
              }
            }
          });
          var videoElements = angular.element.find('video');
          //console.log("videoElements :: ",angular.element.find('video'));
          if (videoElements[0]) {
            videoElements[0].pause();
            videoElements[0].currentTime = 0;
            videoElements[0].play();
          }
        };

        $scope.onTimeSet = function (newDate, oldDate) {
          console.log("newDate : ", newDate);
          console.log("oldDate : ", oldDate);
        }

      }
    ]);

})();