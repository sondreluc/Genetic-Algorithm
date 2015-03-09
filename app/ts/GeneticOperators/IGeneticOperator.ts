'use strict';
///<reference path="../Genomes/AbstractGenome.ts"/>

module GeneticOperators{
  export interface IGeneticOperator {
    crossoverRate:number;
    mutationRate:number;

    crossover(parent1:Genomes.AbstractGenome, parent2:Genomes.AbstractGenome): Genomes.AbstractGenome;
    mutate(genome:Genomes.AbstractGenome): void;
  }
}
