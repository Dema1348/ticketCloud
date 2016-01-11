angular.module('ticketCloudApp.services', [])

.factory('ticketCloudFactory', function($firebase,$firebaseAuth) {
 	var ref=  new Firebase('https://ticketcloud.firebaseio.com');
 	var refTickets= new Firebase('https://ticketcloud.firebaseio.com/tickets');

 	return{
 		ref: function() {
 			return ref;
 		},
 		refTickts:function() {
 			return refTickets;
 		}, 
 		auth:function() {
 			return $firebaseAuth(ref)
 		}
 		
 	}
})

.factory('authFactory',function($firebase,$firebaseAuth) {
	var ref=  new Firebase('https://ticketcloud.firebaseio.com');
	var auth=  $firebaseAuth(ref);

	return{
		login:function(user) {
			return auth.$authWithPassword({
				email: user.correo,
				password: user.pass
			})

		},
		registro:function(user) {
			return auth.$createUser({
				email: user.correo,
				password: user.pass
			}).then(function(authData) {
				var perfil={
					nombre: user.nombre,
					email: user.correo,
					}
				 ref.child("usuarios").child(authData.uid).set({
						profile: perfil
						});
				return authData; 	
			})
		},
		reset:function(user) {
			return auth.$resetPassword({
				email: user.correo
			})
		},
		sesionIniciada: function(){
			return !!auth.usuario.provider; //Devuelve false, null en caso de que el usuario haya o no iniciado sesión.
		},

		cerrarSesion: function(){
			auth.$unauth();
		}
	}
 	
})
