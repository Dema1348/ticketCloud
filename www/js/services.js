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
			
		};
	}
 	
})