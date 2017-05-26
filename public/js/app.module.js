(function () {
  'use strict';
  angular.module('VOD', ['ui.router','ngToast','720kb.datepicker','ngFileUpload'])
    .constant('appConfig', {ver: '1.0', name: 'Vedio On Demand'});
})();