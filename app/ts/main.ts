'use strict';
function test(){

  var oneMax = new GeneticAlgorithms.OneMax(0.5, 0.3, 200);
  var resulTable = document.getElementById('result');
  resulTable.innerHTML = '';
  oneMax.evolutionLoop();

}
