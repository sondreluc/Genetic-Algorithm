'use strict';
///<reference path="../Genomes/AbstractGenome.ts"/>

module FitnessEvaluators{
  export interface IFitnessEvaluator {
    calculateFitness: FitnessFunction;
  }

  export interface FitnessFunction {
    (genome:Genomes.AbstractGenome) : number;
  }

}



