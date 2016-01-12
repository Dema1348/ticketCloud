angular.module('ticketCloud.controllers', [])

// APP - RIGHT MENU
.controller('AppCtrl', function($scope){

})

.controller('HomeCtrl', function($scope, $ionicActionSheet, $state,authFactory){
	$scope.user=authFactory.getUser();
})



.controller('StartCtrl', function($scope, $ionicModal, $state,authFactory,$state){
	if(authFactory.getAuth().$getAuth())
		$state.go("tab.home")

	$scope.bg = ["http://lorempixel.com/640/1136?1"];

	$ionicModal.fromTemplateUrl('views/partials/privacy-policy.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.privacy_policy_modal = modal;
  });

	$ionicModal.fromTemplateUrl('views/partials/terms-of-service.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.terms_of_service_modal = modal;
  });

  $scope.showPrivacyPolicy = function() {
    $scope.privacy_policy_modal.show();
  };

	$scope.showTerms = function() {
    $scope.terms_of_service_modal.show();
  };
})




.controller('CrearCuentaCtrl', function($scope, $state,$ionicLoading, authFactory){
	if(authFactory.getAuth().$getAuth())
		$state.go("tab.home")

	$scope.user=[];
	$scope.doSignUp = function() {
  		$ionicLoading.show({
	      template: 'Esperando solicitud...'
	    });
  		var user= $scope.user;
        authFactory.registro(user).then(
        	function() {		
        		$state.go('tab.home')
        	},
        	function(error) {
       
             if (error) {
                switch (error.code) {
                  case "EMAIL_TAKEN":
                    $scope.error="El correo electrónico especificado ya se encuentra registrado."
                    break;
                  case "INVALID_PASSWORD":
                   $scope.error="La contraseña especificada para el usuario es incorrecta."
                    break;
                  default:
                    $scope.error="Error desconocido al crear cuenta de usuario";
                    break;
                }
            }
        		
        	}).then(function() {
        		$scope.form=[];
        		$ionicLoading.hide();
        		


        	})

  	};

  	$scope.loginFace=function() {
  		authFactory.loginFace().then(function() {
  				$state.go('tab.home')
  		})
  	};

  	$scope.loginTwitter=function() {
  		authFactory.loginTwitter().then(function() {
  			$state.go('tab.home')
  		})
  	};
})


.controller('LoginCtrl', function($scope, $ionicModal, $state,$ionicLoading, authFactory){
	if(authFactory.getAuth().$getAuth())
		$state.go("tab.home")

	$scope.user=[];
	$scope.doLogIn = function() {
  		$ionicLoading.show({
	      template: 'Esperando solicitud...'
	    });
  		var user= $scope.user;
        authFactory.login(user).then(
        	function(authData) {
        		$state.go('tab.home')
        	},
        	function(error) {
            
            if (error) {
                switch (error.code) {
                  case "INVALID_EMAIL":
                    $scope.error="El correo electrónico especificado para el usuario es inválido."
                    break;
                  case "INVALID_PASSWORD":
                   $scope.error="La contraseña especificada para el usuario es incorrecta."
                    break;
                  case "INVALID_USER":
                     $scope.error="El correo electrónico especificado no existe."
                    break;
                  default:
                    console.log("Error desconocido al iniciar sesion");
                }

              }

        		
        
        	}).then(function() {
        		$ionicLoading.hide();
        	})

  	};

	$ionicModal.fromTemplateUrl('views/partials/forgot-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.forgot_password_modal = modal;
  });

  $scope.showForgotPassword = function() {
    $scope.forgot_password_modal.show();
  };

	$scope.requestNewPassword = function() {
  		$ionicLoading.show({
	      template: 'Esperando solicitud...'
	    });
	    var user= $scope.user;
  		authFactory.reset(user).then(
  			function() {
  				$scope.message="Se ha enviado un correo con la contraseña temporal."
  			},
  			function(error) {
          if (error) {
                switch (error.code) {
                  case "INVALID_USER":
                    $scope.error="El correo electrónico especificado no existe."
                    break;
                  default:
                    $scope.error="Error desconocido al reiniciar cuenta de usuario"
                    break;
                }

          	}

  			}).then(function() {
  				$scope.form=[];
  				$ionicLoading.hide();
  			})
  	}

  // //Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  // // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });
})

;
