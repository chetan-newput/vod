(function () {
  'use strict';

  angular.module('VOD')
    .component('profile', {
      templateUrl: '/js/components/profile/profile.component.html',
      controller: profileCtrl
    });

  function profileCtrl($state, $http, auth, ngToast, appConfig, Upload) {
    var ctrl = this;
    ctrl.appName = appConfig.name;
    ctrl.title = "My Profile";
    ctrl.user = {};
    ctrl.$onInit = onInit;
    ctrl.updateProfile = updateProfile;
    ctrl.profilePic;

    function updateProfile(userProfile) {

      var formData = new FormData();
      angular.forEach(ctrl.user, function (value, key) {
        if((key != "_id") && (key != "email")) {
          formData.append(key, value);
        }
      });

      if (ctrl.profile_form.profilePic && ctrl.profilePic) {
        formData.append('profilePic', ctrl.profilePic);
      }

      auth.updateUserProfile(formData)
        .then(function (response) {
          console.log("component updateProfile data :", response.dat);
          if (response.data.success) {
            ngToast.success({
              content: 'User profile has been successfully updated.'
            });
          } else {
            ngToast.danger({
              content: 'Opps! something wrong happend!'
            });
          }
        })
        .catch(function (error) {
          ngToast.danger({
            content: 'Opps! something wrong happend!'
          });
        });
    }

    function onInit() {
      ctrl.error = null;
      auth.getUserProfile()
        .then(function (data) {
          ctrl.user = data;
        })
        .catch(function (error) {
          ctrl.error = error.data;
        });
    }
  }
})();