(function () {
  'use strict';

  angular.module('VOD')
    .config(['$stateProvider', '$urlRouterProvider', '$qProvider', '$locationProvider','ngToastProvider', function ($stateProvider, $urlRouterProvider, $qProvider, $locationProvider,ngToastProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/js/template/home.html',
          controller: 'MainCtrl',
          data: {
            requireLogin: true
          },
          resolve: {
            promiseObj: ['posts',
              function (posts) {
                return posts.getAll();
              }
            ]
          }
        })
        .state('profile',{
          url: '/profile',
          templateUrl: '/js/template/profile.html',
          data: {
            requireLogin: true
          }
        })
        .state('history', {
          url: '/history',
          templateUrl: '/js/template/history.html',
          controller: 'HistoryCtrl',
          data: {
            requireLogin: true
          },
          resolve: {
            moviesObj: ['posts',
              function (posts) {
                return posts.getAll();
              }
            ],
            historyObj: ['posts',
              function (posts) {
                return posts.getUserHistory();
              }
            ]
          }
        })
        .state('login', {
          url: '/login',
          templateUrl: '/js/template/login.html',
          data: {
            requireLogin: false
          }
        })
        /*.state('facebook-login', {
          url: '/facebook-login',
          templateUrl: '/js/template/login.html',
          data: {
            requireLogin: false
          }
        })*/
        .state('register', {
          url: '/register',
          templateUrl: '/js/template/register.html',
          data: {
            requireLogin: false
          }
        });
      $urlRouterProvider.otherwise('home');
      //for setting url without #
      $locationProvider.html5Mode(true);
      $qProvider.errorOnUnhandledRejections(false);
      ngToastProvider.configure({
        horizontalPosition: 'center'
      });
    }]);

  angular.module('VOD')
    .run(['$rootScope', '$state', 'auth', function ($rootScope, $state, auth) {
      $rootScope.$on('$stateChangeStart', function (event, $stateProvider) {
        var requireLogin = $stateProvider.data.requireLogin;
        if (requireLogin && (!auth.isLoggedIn())) {
          event.preventDefault();
          $state.go("login");
        }
      });

      $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
          if (($state.current.name == "login") || ($state.current.name == "register") && (auth.isLoggedIn())) {
            $state.go("home");
          }
        });
    }]);

})();