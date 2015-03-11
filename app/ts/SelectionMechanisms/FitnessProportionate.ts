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
      for (var i = 0; i < 2; i++) {
        var randomNumber = Math.random() * fitnessSum;
        var j = 0;
        while (randomNumber > 0 && j < adults.length - 1) {
          randomNumber -= adults[j].getFitness();
          j++;
        }
        selected.push(adults[j]);
      }

      return selected;
    }
  }
}
