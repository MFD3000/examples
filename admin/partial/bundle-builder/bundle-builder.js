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
    
    $scope.submit = function() {
      if ($scope.comboData) {
        
        
        var processedCombos = BundleService.transformInput($scope.comboData);
        if(!_.isNull(processedCombos)){
          $scope.combinations = BundleService.generateCombinations(processedCombos);  
          if(_.isEmpty($scope.combinations)){
            //handle no combos found on ui
            console.log("no combos");
          }
        }else{
          //handle bad string error on ui
          console.log("bad input");
        }
        

        

      }
    };

});