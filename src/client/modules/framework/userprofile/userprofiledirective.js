(function() {
	'use strict';

	angular
		.module('spaFramework')
		.directive('spaUserProfile', spaUserProfile);

	function spaUserProfile() {
		
		return {
			templateUrl: 'modules/framework/userprofile/userprofiletemplate.html',
			controller: 'spaFrameworkController'
		};		
	}

})();