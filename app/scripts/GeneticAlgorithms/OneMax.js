'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="AbstractGeneticAlgorithm.ts"/>
///<reference path="../FitnessEvaluators/OneMaxFitnessEvaluator.ts"/>
///<reference path="../Genomes/BitVector.ts"/>
///<reference path="../SelectionMechanisms/ISelectionMechanism.ts"/>
///<reference path="../SelectionMechanisms/FitnessProportionate.ts"/>
///<reference path="../GeneticOperators/BinaryOperator.ts"/>
var GeneticAlgorithms;
(function (GeneticAlgorithms) {
    var OneMax = (function (_super) {
        __extends(OneMax, _super);
        function OneMax(crossoverRate, mutationRate, populationSize, goalVector) {
            if (goalVector === void 0) { goalVector = undefined; }
            _super.call(this, crossoverRate, new FitnessEvaluators.OneMaxFitnessEvaluator(goalVector), OneMax.generateInitialPopulation(populationSize), mutationRate, populationSize, new SelectionMechanisms.FitnessProportionate(populationSize));
            this.finished = false;
            this.highestFitness = 0;
            this.averageFitness = 0;
            this.best = [];
            this.geneticOperator = new GeneticOperators.BinaryOperator(crossoverRate, mutationRate);
        }
        OneMax.generateInitialPopulation = function (populationSize, genomeSize) {
            if (genomeSize === void 0) { genomeSize = 50; }
            var initialPopulation = [];
            for (var i = 0; i < populationSize; i++) {
                var vector = [];
                for (var j = 0; j < genomeSize; j++) {
                    vector.push(Math.round(Math.random()));
                }
                initialPopulation.push(new Genomes.BitVector(vector));
            }
            return initialPopulation;
        };
        OneMax.prototype.evolutionLoop = function () {
            var _this = this;
            for (var i = 0; i < this.maxGenerations; i++) {
                var populationHighest = 0;
                var bestIndividual;
                var fitnessSum = 0;
                this.currentGeneration.forEach(function (individual) {
                    _this.fitnessEvaluator.calculateFitness(individual);
                    var individualFitness = individual.getFitness();
                    if (individualFitness > populationHighest) {
                        populationHighest = individualFitness;
                        bestIndividual = individual;
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
                else if (i < this.maxGenerations - 1) {
                    this.printRound(i, populationHighest, bestIndividual);
                }
                this.evolve();
            }
        };
        OneMax.prototype.evolve = function () {
            var newPopulation = [];
            this.currentGeneration = this.currentGeneration.sort(function (a, b) {
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
                var child = this.geneticOperator.crossover(parents[0], parents[1]);
                this.geneticOperator.mutate(child);
                newPopulation.push(child);
            }
            this.currentGeneration = newPopulation;
        };
        OneMax.prototype.printPopulation = function () {
            this.currentGeneration = this.currentGeneration.sort(function (a, b) {
                return b.getFitness() - a.getFitness();
            });
            this.currentGeneration.forEach(function (a) {
                console.log(a.getChromosomes(), a.getFitness());
            });
        };
        OneMax.prototype.printRound = function (generation, populationHighest, bestIndividual) {
            var resulTable = document.getElementById('result');
            var tr = document.createElement('TR');
            var td = document.createElement('TD');
            td.className = 'generation';
            td.appendChild(document.createTextNode('' + generation));
            tr.appendChild(td);
            td = document.createElement('TD');
            td.className = 'avg-fitness';
            td.appendChild(document.createTextNode('' + this.averageFitness));
            tr.appendChild(td);
            td = document.createElement('TD');
            td.className = 'highest-fitness';
            td.appendChild(document.createTextNode('' + populationHighest));
            tr.appendChild(td);
            td = document.createElement('TD');
            td.className = 'best-fitness-population';
            td.appendChild(document.createTextNode('' + bestIndividual.getFitness()));
            tr.appendChild(td);
            resulTable.appendChild(tr);
        };
        return OneMax;
    })(GeneticAlgorithms.AbstractGeneticAlgorithm);
    GeneticAlgorithms.OneMax = OneMax;
})(GeneticAlgorithms || (GeneticAlgorithms = {}));
