'use strict';

angular.module('VOD')
  .component('login', {
    controller: loginCtrl,
    templateUrl: '/js/components/login/login.component.html',
    //bindings: {}
  });

function loginCtrl($scope, $state, auth, appConfig) {
  var ctrl = this;
  ctrl.user = {};
  ctrl.logIn = logIn;
  ctrl.$onInit = onInit;

  function onInit(){
    ctrl.appName = appConfig.name;
  }

  function logIn() {
    ctrl.error = null;
    auth.logIn(ctrl.user)
      .then(function () {
        if (!ctrl.error) {
          $state.go('home');
        }
      })
      .catch(function (error) {
        ctrl.error = error.data;
      });
  };
};