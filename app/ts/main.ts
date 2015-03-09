'use strict';
function test(){
  var vector1 = [];
  var vector2 = [];
  for (var j = 0; j < 10; j++) {
    vector1.push(Math.round(Math.random()));
    vector2.push(Math.round(Math.random()));
  }


  var bitVectorGenome1 = new Genomes.BitVector(vector1);
  var bitVectorGenome2 = new Genomes.BitVector(vector2);
  var genecticOperator = new GeneticOperators.BinaryOperator();

  console.log(bitVectorGenome1.getChromosomes());
  console.log(bitVectorGenome2.getChromosomes());


  var child = genecticOperator.crossover(bitVectorGenome1, bitVectorGenome2);

  console.log(child.getChromosomes(), ' - crossover child');
  genecticOperator.mutate(child);
  console.log(child.getChromosomes(), ' - mutation');


}
