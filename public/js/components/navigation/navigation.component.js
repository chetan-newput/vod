'use strict';

angular.module('VOD')
  .component('navigation', {
    controller: navigationCtrl,
    templateUrl: '/js/components/navigation/navigation.component.html',
    //bindings: {}
  });

function navigationCtrl($state, auth) {
  var ctrl = this;

  ctrl.isLoggedIn = auth.isLoggedIn;
  ctrl.currentUser = auth.currentUser;
  ctrl.logOut = auth.logOut;
};