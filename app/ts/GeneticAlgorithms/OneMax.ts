'use strict';
///<reference path="AbstractGeneticAlgorithm.ts"/>
///<reference path="../FitnessEvaluators/OneMaxFitnessEvaluator.ts"/>
///<reference path="../Genomes/BitVector.ts"/>
///<reference path="../SelectionMechanisms/ISelectionMechanism.ts"/>
///<reference path="../SelectionMechanisms/FitnessProportionate.ts"/>
///<reference path="../GeneticOperators/BinaryOperator.ts"/>

module GeneticAlgorithms {
  export class OneMax extends AbstractGeneticAlgorithm {
    private finished:boolean = false;
    private geneticOperator:GeneticOperators.BinaryOperator;
    private highestFitness:number = 0;
    private averageFitness:number = 0;
    private best:Array<Genomes.AbstractGenome> = [];


    constructor(crossoverRate:number, mutationRate:number, populationSize:number, goalVector:number[] = undefined) {
      super(crossoverRate, new FitnessEvaluators.OneMaxFitnessEvaluator(goalVector), OneMax.generateInitialPopulation(populationSize),
        mutationRate, populationSize, new SelectionMechanisms.FitnessProportionate(populationSize));
      this.geneticOperator = new GeneticOperators.BinaryOperator(crossoverRate, mutationRate);
    }

    static generateInitialPopulation(populationSize:number, genomeSize:number = 50):Array<Genomes.BitVector> {
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

        var populationHighest = 0;
        var bestIndividual:Genomes.BitVector;
        var fitnessSum = 0;
        this.currentGeneration.forEach(individual => {
          this.fitnessEvaluator.calculateFitness(individual);
          var individualFitness = individual.getFitness();
          if (individualFitness > populationHighest) {
            populationHighest = individualFitness;
            bestIndividual = <Genomes.BitVector>individual;
          }
          fitnessSum += individualFitness;
        });

        this.highestFitness = (populationHighest > this.highestFitness ? populationHighest : this.highestFitness);
        this.averageFitness = fitnessSum / this.currentGeneration.length;


        if (this.highestFitness === 1) {
          this.printRound(i, populationHighest, bestIndividual);
          this.finished = true;
          console.log("REACHED");
          break;
        }
        else if(i < this.maxGenerations-1){
          this.printRound(i, populationHighest, bestIndividual);
        }
        this.evolve();
      }
    }

    evolve() {
      var newPopulation = [];
      this.currentGeneration = this.currentGeneration.sort((a, b) => {
        return b.getFitness() - a.getFitness();
      });
      if (this.elitism) {
        this.best = [];
        for (var j = 0; j < this.elitismOffset; j++) {
          this.best.push(this.currentGeneration[j]);
          newPopulation.push(this.currentGeneration[j]);
        }
      }
      for (var i = 0; i < this.populationSize - this.elitismOffset; i++) {
        var parents = this.selectionMechanism.selectParents(this.currentGeneration);
        var child = this.geneticOperator.crossover(<Genomes.BitVector>parents[0], <Genomes.BitVector>parents[1]);
        this.geneticOperator.mutate(child);
        newPopulation.push(child);
      }
      this.currentGeneration = newPopulation;
    }

    printPopulation() {
      this.currentGeneration = this.currentGeneration.sort(function (a, b) {
        return b.getFitness() - a.getFitness();
      });
      this.currentGeneration.forEach(a => {
        console.log((<Genomes.BitVector>a).getChromosomes(), (<Genomes.BitVector>a).getFitness());
      })
    }

    printRound(generation:number, populationHighest:number, bestIndividual:Genomes.BitVector) {
      var resulTable = document.getElementById('result');
      var tr = document.createElement('TR');
      var td = document.createElement('TD');
      td.className = 'generation';
      td.appendChild(document.createTextNode(''+generation));
      tr.appendChild(td);

      td = document.createElement('TD');
      td.className = 'avg-fitness';
      td.appendChild(document.createTextNode(''+this.averageFitness));
      tr.appendChild(td);

      td = document.createElement('TD');
      td.className = 'highest-fitness';
      td.appendChild(document.createTextNode(''+populationHighest));
      tr.appendChild(td);


      td = document.createElement('TD');
      td.className = 'best-fitness-population';
      td.appendChild(document.createTextNode(''+bestIndividual.getFitness()));
      tr.appendChild(td);


      resulTable.appendChild(tr);
    }
  }
}
