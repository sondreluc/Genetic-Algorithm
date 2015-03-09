'use strict';
///<reference path="../Genomes/AbstractGenome.ts"/>

module SelectionMechanisms{
  export interface ISelectionMechanism{
    selectParents(adults:Array<Genomes.AbstractGenome>):Array<Genomes.AbstractGenome>;
  }
}
