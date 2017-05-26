'use strict';

angular.module('VOD')
  .component('header', {
    controller: headerCtrl,
    templateUrl: '/js/components/header/header.component.html',
    //bindings: {}
  });

function headerCtrl($state, auth) {
  var ctrl = this;
};