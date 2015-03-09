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
var GeneticAlgorithms;
(function (GeneticAlgorithms) {
    var OneMax = (function (_super) {
        __extends(OneMax, _super);
        function OneMax(crossoverRate, mutationRate, populationSize, goalVector) {
            if (goalVector === void 0) { goalVector = undefined; }
            _super.call(this, crossoverRate, new FitnessEvaluators.OneMaxFitnessEvaluator(goalVector), OneMax.generateInitialPopulation(populationSize), mutationRate, populationSize);
            this.finished = false;
        }
        OneMax.generateInitialPopulation = function (populationSize, genomeSize) {
            if (genomeSize === void 0) { genomeSize = 40; }
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
            for (var i = 0; i < this.maxGenerations; i++) {
            }
        };
        return OneMax;
    })(GeneticAlgorithms.AbstractGeneticAlgorithm);
})(GeneticAlgorithms || (GeneticAlgorithms = {}));
