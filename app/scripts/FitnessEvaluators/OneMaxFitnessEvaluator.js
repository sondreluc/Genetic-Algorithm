'use strict';
///<reference path="../FitnessEvaluators/IFitnessEvaluator.ts"/>
///<reference path="../Genomes/BitVector.ts"/>
var FitnessEvaluators;
(function (FitnessEvaluators) {
    var OneMaxFitnessEvaluator = (function () {
        function OneMaxFitnessEvaluator(goalVector) {
            if (goalVector === void 0) { goalVector = undefined; }
            this.goalVector = goalVector;
        }
        OneMaxFitnessEvaluator.prototype.calculateFitness = function (genome) {
            var fitness = 0;
            if (this.goalVector) {
                for (var i = 0; i < this.goalVector.length; i++) {
                    fitness += (this.goalVector[i] === genome.getChromosomes()[i] ? 1 : 0);
                }
            }
            else {
                genome.getChromosomes().forEach(function (chromosome) {
                    fitness += chromosome;
                });
            }
            genome.setFitness(fitness / genome.getChromosomes().length);
            return genome.getFitness();
        };
        return OneMaxFitnessEvaluator;
    })();
    FitnessEvaluators.OneMaxFitnessEvaluator = OneMaxFitnessEvaluator;
})(FitnessEvaluators || (FitnessEvaluators = {}));
