'use strict';
///<reference path="ISelectionMechanism.ts"/>
///<reference path="../Genomes/AbstractGenome.ts"/>

module SelectionMechanisms {

  export class FitnessProportionate implements ISelectionMechanism {

    constructor(private populationSize:number) {
    }

    selectParents(adults:Array<Genomes.AbstractGenome>):Array<Genomes.AbstractGenome> {
      // Might not work as expected...
      var fitnessSum = 0;

      adults.forEach(adult => {
        fitnessSum += adult.getFitness();
      });

      var selected = [];
      for (var i = 0; i < this.populationSize; i++) {
        var random = Math.random() * fitnessSum;
        var iSum = 0;
        var j = 0;
        while (j < this.populationSize && iSum < random) {
          iSum += iSum + adults[j].getFitness();
        }
        selected.push(adults[j]);
      }

      return selected;
    }
  }
}
