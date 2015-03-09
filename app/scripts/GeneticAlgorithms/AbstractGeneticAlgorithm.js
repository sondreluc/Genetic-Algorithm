'use strict';
///<reference path="../FitnessEvaluators/IFitnessEvaluator.ts"/>
///<reference path="../Genomes/AbstractGenome.ts"/>
///<reference path="../GeneticOperators/IGeneticOperator.ts"/>
var GeneticAlgorithms;
(function (GeneticAlgorithms) {
    var AbstractGeneticAlgorithm = (function () {
        function AbstractGeneticAlgorithm(crossoverRate, fitnessEvaluator, initialGeneration, mutationRate, populationSize, maxGenerations) {
            if (maxGenerations === void 0) { maxGenerations = 999; }
            this.currentGeneration = initialGeneration;
            this.crossoverRate = crossoverRate;
            this.fitnessEvaluator = fitnessEvaluator;
            this.generationsCount = 0;
            this.maxGenerations = maxGenerations;
            this.mutationRate = mutationRate;
            this.populationSize = populationSize;
        }
        AbstractGeneticAlgorithm.prototype.evolutionLoop = function () {
            throw Error('Evolution loop not impelemented');
        };
        AbstractGeneticAlgorithm.prototype.evolve = function () {
            throw Error('Evolution loop not impelemented');
        };
        return AbstractGeneticAlgorithm;
    })();
    GeneticAlgorithms.AbstractGeneticAlgorithm = AbstractGeneticAlgorithm;
})(GeneticAlgorithms || (GeneticAlgorithms = {}));
