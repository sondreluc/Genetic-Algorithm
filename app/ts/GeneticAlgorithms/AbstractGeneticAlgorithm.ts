'use strict';
///<reference path="../FitnessEvaluators/IFitnessEvaluator.ts"/>
///<reference path="../GeneticOperators/IGeneticOperator.ts"/>
///<reference path="../Genomes/AbstractGenome.ts"/>
///<reference path="../SelectionMechanisms/ISelectionMechanism.ts"/>


module GeneticAlgorithms {
  export interface IGeneticAlgorithm {
    evolutionLoop(): void;
    evolve(): void;
  }

  export class AbstractGeneticAlgorithm implements IGeneticAlgorithm {

    crossoverRate:number;
    currentGeneration:Array<Genomes.AbstractGenome>;
    fitnessEvaluator:FitnessEvaluators.IFitnessEvaluator;
    generationsCount:number;
    maxGenerations:number;
    mutationRate:number;
    populationSize:number;
    selectionMechanism:SelectionMechanisms.ISelectionMechanism;
    elitism:boolean = true;
    elitismOffset:number = 20;


    constructor(crossoverRate:number, fitnessEvaluator:FitnessEvaluators.IFitnessEvaluator, initialGeneration:Array<Genomes.AbstractGenome>,
                mutationRate:number, populationSize:number, selectionMechanism:SelectionMechanisms.ISelectionMechanism, maxGenerations:number = 300) {

      this.currentGeneration = initialGeneration;
      this.crossoverRate = crossoverRate;
      this.fitnessEvaluator = fitnessEvaluator;
      this.generationsCount = 0;
      this.maxGenerations = maxGenerations;
      this.mutationRate = mutationRate;
      this.populationSize = populationSize;
      this.selectionMechanism = selectionMechanism;
    }

    evolutionLoop():void {
      throw Error('Evolution loop not impelemented');
    }

    evolve():void {
      throw Error('Evolution loop not impelemented');
    }
  }
}
