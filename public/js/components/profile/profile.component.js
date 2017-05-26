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

      if (ctrl.profile_form.profilePic && ctrl.profilePic) {

        Upload.upload({
          url: '/myprofile',
          data: {
            profilePic: ctrl.profilePic,
            user: ctrl.user
          }, //pass file as data, should be user ng-model
          /*headers: {
            'Authorization': 'Bearer ' + auth.getToken()
          }*/
        }).then(function (resp) { //upload function returns a promise
          console.log("Response data :: ", resp.data);
          if (resp.data.success) { //validate success
            ngToast.success({
              content: 'User profile has been successfully updated.'
            });
            console.log('Success file successfully uploaded.');
          } else {
            ngToast.danger({
              content: 'Opps! something wrong happend!'
            });
            console.log('an error occured');
          }
        }, function (errorResp) { //catch error
          console.log("Error Response data :: ", errorResp);
          ngToast.danger({
            content: 'Opps! something wrong happend!'
          });
        });

      } else {

        auth.updateUserProfile({
            user: ctrl.user
          })
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