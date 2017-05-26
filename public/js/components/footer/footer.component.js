'use strict';

angular.module('VOD')
  .component('footer', {
    controller: footerCtrl,
    templateUrl: '/js/components/footer/footer.component.html',
    bindings: {
      footerText: '@',
    }
  });

function footerCtrl($state, auth) {
  var ctrl = this;
  ctrl.$onInit = onInit;

  function onInit(){
  }
};