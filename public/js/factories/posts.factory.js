(function () {
  'use strict';

  angular.module('VOD')
    .factory('posts', ['$http', 'auth',
      function ($http, auth) {
        var o = {
          posts: [],
          myhistory: []
        };

        o.getAll = getAll;
        o.addToUserHistory = addToUserHistory;
        o.getUserHistory = getUserHistory;

        function getAll() {
          //console.log("callinbg getAll");
          var movies = [];

          return $http({
            method: "GET",
            url: 'https://demo2697834.mockable.io/movies'
          }).then(function mySucces(response) {
            //console.log("Start Getting movies :: ",(response.data.entries && ( response.data.entries.length > 0 ) ));
            if (response.data.entries && (response.data.entries.length > 0)) {
              var start = 0;
              var i = 0;
              response.data.entries.forEach(function (entry) {
                if ((i != 0) && (i % 4 == 0)) {
                  start++;
                }
                if (movies[start]) {
                  movies[start].push(entry);
                } else {
                  movies[start] = new Array(entry);
                }
                i++;
              });
            }
            //console.log("Getting movies :: ",movies);
            angular.copy(movies, o.posts);
            //return response;
            return o.posts;
          }, function myError(response) {
            console.log("Error Response :: ", response);
            return response;
          });
        };

        function addToUserHistory(movie_id) {
          return $http.post('/history', movie_id)
            .then(function (response) {
            console.log("after  : ", response.data);
            o.posts.push(response.data);
          });
        };

        function getUserHistory() {
          return $http.get('/myhistory')
            .then(function (response) {
              return response.data;
            }, function (error) {
              return error;
            });
        };

        return o;
      }
    ]);
})();