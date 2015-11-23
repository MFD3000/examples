angular.module('admin').controller('BundleBuilderCtrl',function($scope, BundleService){


$scope.list = [];
$scope.getTotal = function(menu){
  var total = 0;
  _.each(menu, function(item){
    total = total + item.value;

  });
  return total;
};

  $scope.combinations = [];
    $scope.text = 'hello';
    $scope.submit = function() {
      if ($scope.comboData) {
        
        console.log($scope.comboData);

        $scope.combinations = BundleService.generateCombinations($scope.comboData);
        console.log($scope.combinations);

      }
    };

});