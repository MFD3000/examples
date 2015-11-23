  /*jslint node: true */
  var _ = require('lodash');
  


  
/*jshint multistr: true */

var rawData = "$15.05 \n\
mixed fruit,$2.15 \n\
french fries,$2.75 \n\
side salad,$3.35 \n\
hot wings,$3.55 \n\
mozzarella sticks,$4.20 \n\
sampler plate,$5.80";

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


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

function generateCombinations(rawData){
  var attemptCounter = 0;

var buildCombos = function coputeCombinations(total, menu, appetizers, optionsGroups) {
    total = _.cloneDeep(total);
    menu = _.cloneDeep(menu);
    
    var appetizers2 =  _.cloneDeep(appetizers);
    
    var newOptionsGroups = [];
    
    attemptCounter = attemptCounter + 1;


    _.each(appetizers, function(app, index){
    
      
       if( total - app.value === 0){
          menu.push(app);
          var goodTotal = 0;
          _.each(menu, function(app){
            goodTotal = goodTotal + app.value;
            
          });
          
          newOptionsGroups.push(menu);
          
          return optionsGroups;

        }

        if(total - app.value > 0){
          var newTotal = total - app.value;
          
          menu.push(app);
          
          var groups =  coputeCombinations(newTotal, menu , appetizers2, optionsGroups);
       
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



  var choiceObj = createChoiceObjFromRawData(rawData);
  try {
     var optionsGroups = [];
     console.log(buildCombos(choiceObj.goal, [], choiceObj.menu, optionsGroups));
    return buildCombos(choiceObj.goal, [], choiceObj.menu, optionsGroups);
     
  }
  catch (e) {
     // statements to handle any exceptions
     console.log(e);
     return [];
  }

}
generateCombinations(rawData);
   
  
  
