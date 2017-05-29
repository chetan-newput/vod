  'use strict';

  angular.module('VOD')
    .factory('auth', ['$http', '$window', '$state',
      function ($http, $window, $state) {
        var auth = {};

        auth.saveToken = saveToken;
        auth.getToken = getToken;
        auth.logOut = logOut;
        auth.isLoggedIn = isLoggedIn;
        auth.currentUser = currentUser;
        auth.register = register;
        auth.logIn = logIn;
        auth.getUserProfile = getUserProfile;
        auth.updateUserProfile = updateUserProfile;

        function getUserProfile() {
          return $http.get('/myprofile')
            .then(function (response) {
              return response.data;
            }, function (error) {
              return error;
            });
        };

        function updateUserProfile(userProfile) {
          return $http.post('/myprofile', userProfile, {
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          }).then(function (response) {
            return response;
          }, function (error) {
            return error;
          });
        }

        function saveToken(token) {
          $window.localStorage['vod-auth-token'] = token;
        };

        function getToken() {
          return $window.localStorage['vod-auth-token'];
        };

        function logOut() {
          $window.localStorage.removeItem('vod-auth-token');
          $state.go('login');
        };

        function isLoggedIn() {
          var token = auth.getToken();
          if ((token != 'undefined') && (token != null) && (token != "")) {
            //console.log(" auth.isLoggedIn token : ",token );	
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
          } else {
            return false;
          }
        };

        function currentUser() {
          if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
          }
        };

        function register(user) {
          return $http.post('/register', user).then(function (data) {
            auth.saveToken(data.data.token);
          });
        };

        function logIn(user) {
          return $http.post('/login', user).then(function (data) {
            auth.saveToken(data.data.token);
          });
        };
        return auth;
      }
    ]);