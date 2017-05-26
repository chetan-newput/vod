'use strict';

angular.module('VOD')
  .component('register', {
    controller: registerCtrl,
    templateUrl: '/js/components/register/register.component.html',
    //bindings: {}
  });

function registerCtrl($state, auth, appConfig) {
 
  var ctrl = this;
  ctrl.user = {};
  ctrl.register = registerUser;
  ctrl.appName = "";
  ctrl.$onInit = onInit;

  function onInit(){
    ctrl.appName = appConfig.name;
  }

  function registerUser() {
    ctrl.error = null;
    auth.register(ctrl.user).catch(function (error) {
      ctrl.error = error.data;
    }).then(function () {
      if (!ctrl.error) {
        $state.go('home');
      }
    });
  };
}