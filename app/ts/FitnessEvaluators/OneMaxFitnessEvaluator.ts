'use strict';
///<reference path="../FitnessEvaluators/IFitnessEvaluator.ts"/>
///<reference path="../Genomes/BitVector.ts"/>

module FitnessEvaluators{
  export class OneMaxFitnessEvaluator implements IFitnessEvaluator {

    constructor(private goalVector:Array<number> = undefined) {
    }

    calculateFitness(genome:Genomes.BitVector) {

      var fitness = 0;

      if (this.goalVector) {
        for (var i = 0; i < this.goalVector.length; i++) {
          fitness += (this.goalVector[i] === genome.getChromosomes()[i] ? 1 : 0);
        }
      } else {
        genome.getChromosomes().forEach(chromosome => {
          fitness += chromosome;
        });
      }
      genome.setFitness(fitness / genome.getChromosomes().length);
      return genome.getFitness();
    }

  }
}
