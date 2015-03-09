'use strict';
///<reference path="IGeneticOperator.ts"/>
///<reference path="../Genomes/BitVector.ts"/>

module GeneticOperators{
  export class BinaryOperator implements IGeneticOperator {

    constructor(public crossoverRate:number = 0.25, public mutationRate:number = 0.1) {
    }

    crossover(parent1:Genomes.BitVector, parent2:Genomes.BitVector):Genomes.BitVector {
      console.log('Crossing over');
      var childVector = [];

      if (Math.random() <= 0.5) {
        childVector = parent1.getChromosomes();
        var otherParent = parent2.getChromosomes();
        console.log('Parent1 selected');
      } else {
        childVector = parent2.getChromosomes();
        var otherParent = parent1.getChromosomes();
        console.log('Parent2 selected');
      }
      console.log(childVector, ' - before crossover');

      if (Math.random() <= this.crossoverRate) {
        var randomIndex = Math.random() * childVector.length;
        for (var i = 0; i < childVector.length; i++) {
          if (i <= randomIndex) {
            childVector[i] = otherParent[i];
          }
        }
      }

      return new Genomes.BitVector(childVector);
    }

    mutate(genome:Genomes.BitVector):void {
      for(var i = 0; i < genome.getChromosomes().length; i++){
        if(Math.random() <= this.mutationRate){
          genome.mutateChromosome(i);
        }
      }
    }

  }
}
