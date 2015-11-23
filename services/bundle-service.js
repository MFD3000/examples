angular.module('NPC').factory('BundleService',function() {



  
  
/*jshint multistr: true */

//START --Helper Functions
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
//END --Helper Functions


//START --Data Scrubber
var createChoiceObjFromRawData = function(rawData){


  var scrubbedData = replaceAll(rawData, '$', ' ');
  //console.log(scrubbedData); 
   
  var newList = scrubbedData.split('\n');

  var goal = parseFloat(newList[0].trim())* 100;
  
  

  newList.splice(0, 1);
  newList = _.chain(newList)
      .map(function(item){

        var newItem = item.split(',');
        var name = newItem[0];
        var value = parseFloat(newItem[1].trim()) * 100;
        // console.log(name);
        // console.log(value);
        return {
          name: name,
          value: value
        };
      })
      .unique()
      .sortBy(function(app){

        return app.value;
      }).value();
    return {goal:goal, menu: newList};
};
//END --Data Scrubber
//START -- Combo Generation Wrapper
function generateCombinations(rawData){
  var attemptCounter = 0;

  //START Recursive combo builder
  var buildCombos = function buildCombos(total, menu, appetizers, optionsGroups) {
    total = _.cloneDeep(total);
    menu = _.cloneDeep(menu);
    
    var appetizers2 =  _.cloneDeep(appetizers);
    
    var newOptionsGroups = [];
    
    attemptCounter = attemptCounter + 1;
    

    _.each(appetizers, function(app, index){
      var goodTotal = 0;
      _.each(menu, function(app){
        goodTotal = goodTotal + app.value;
        
      });
  
       if( total - (goodTotal + app.value) === 0){
          menu.push(app);
          
          
          
          newOptionsGroups.push(menu);
          
            return optionsGroups;

        }

        if(total - goodTotal > 0){
          var newTotal = total - app.value;
          
          menu.push(app);
          
          var groups =  buildCombos(total, menu , appetizers2, optionsGroups);
       
          if(!_.isEmpty(groups)){
            newOptionsGroups = newOptionsGroups.concat(groups);
          }
          
        }

        //remove values that have already been checked against.
        appetizers2 = _.reject(appetizers2, function(removeApp){
          return (removeApp.value===app.value && removeApp.name===app.name);
        });
       
    });
  
    return newOptionsGroups;
    
  };
  //END Recursive combo builder


  var choiceObj = createChoiceObjFromRawData(rawData);
  try {
     var optionsGroups = [];
     
    return buildCombos(choiceObj.goal, [], choiceObj.menu, optionsGroups);
     
  }
  catch (e) {
     // statements to handle any exceptions
     console.log(e);
     return [];
  }

}
//END -- Combo Generation Wrapper
    
	return {
    generateCombinations:generateCombinations
  };
});