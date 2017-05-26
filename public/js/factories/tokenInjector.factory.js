(function () {
  'use strict';
  angular.module('VOD')
    .factory('tokenInjector', ['$window',function ($window) {
      var tokenInjector = {
        request: function (config) {
          var token = $window.localStorage['vod-auth-token'];
          if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
          }
          return config;
        }
      };
      return tokenInjector;
    }]);

  angular.module('VOD')
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('tokenInjector');
    }]);
})();