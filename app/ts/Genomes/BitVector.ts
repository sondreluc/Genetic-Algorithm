'use strict';
///<reference path="AbstractGenome.ts"/>
module Genomes{
  export class BitVector extends AbstractGenome {
    private chromosomes:Array<number>;

    constructor(chromosomes:Array<number>) {
      super();
      this.chromosomes = chromosomes;
    }

    getChromosomes():Array<number> {
      return this.chromosomes;
    }

    mutateChromosome(index:number):void {
      this.chromosomes[index] = (this.chromosomes[index] === 1 ? 0 : this.chromosomes[index]);
    }

  }

}
