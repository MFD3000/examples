angular.module('NPC', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'menu', 'admin']);

angular.module('NPC').config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/admin');

});

angular.module('NPC').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
