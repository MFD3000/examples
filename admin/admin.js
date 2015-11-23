angular.module('admin', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('admin').config(function($stateProvider) {

    
    $stateProvider.state('bundle-builder', {
        url: '/admin/bundles',
        templateUrl: 'admin/partial/bundle-builder/bundle-builder.html'
    });
    /* Add New States Above */

});

