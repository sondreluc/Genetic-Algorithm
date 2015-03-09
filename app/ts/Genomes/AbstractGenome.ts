'use strict';

module Genomes {
  export interface IGenome {
    getFitness(): number;
    setFitness(fitness:number): void;
  }

  export class AbstractGenome implements IGenome {
    private fitness:number;

    constructor(initialFitness:number = 0) {
      this.fitness = initialFitness;
    }

    setFitness(fitness:number):void {
      this.fitness = fitness;
    }

    getFitness():number {
      return this.fitness;
    }
  }


}
