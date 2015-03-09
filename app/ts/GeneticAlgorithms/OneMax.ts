'use strict';
///<reference path="AbstractGeneticAlgorithm.ts"/>
///<reference path="../FitnessEvaluators/OneMaxFitnessEvaluator.ts"/>
///<reference path="../Genomes/BitVector.ts"/>
///<reference path="../SelectionMechanisms/FitnessProportionate.ts"/>

module GeneticAlgorithms {
  class OneMax extends AbstractGeneticAlgorithm {
    private finished:boolean = false;

    constructor(crossoverRate:number, mutationRate:number, populationSize:number, goalVector:Array<number> = undefined) {
      super(crossoverRate, new FitnessEvaluators.OneMaxFitnessEvaluator(goalVector), OneMax.generateInitialPopulation(populationSize), mutationRate, populationSize, SelectionMechanisms.FitnessProportionate);
    }

    static generateInitialPopulation(populationSize:number, genomeSize:number = 40):Array<Genomes.BitVector> {
      var initialPopulation = [];
      for (var i = 0; i < populationSize; i++) {
        var vector = [];

        for (var j = 0; j < genomeSize; j++) {
          vector.push(Math.round(Math.random()));
        }

        initialPopulation.push(new Genomes.BitVector(vector));
      }
      return initialPopulation;
    }

    evolutionLoop() {
      for (var i = 0; i < this.maxGenerations; i++) {
        //do something loopy
      }
    }

    evolve() {
      // 1.Calculate fitness
      // 2.a Select individuals for crossover
      // 2.b Mutate
    }
  }
}
