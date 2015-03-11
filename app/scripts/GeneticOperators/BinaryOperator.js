'use strict';
///<reference path="IGeneticOperator.ts"/>
///<reference path="../Genomes/BitVector.ts"/>
var GeneticOperators;
(function (GeneticOperators) {
    var BinaryOperator = (function () {
        function BinaryOperator(crossoverRate, mutationRate) {
            if (crossoverRate === void 0) { crossoverRate = 0.25; }
            if (mutationRate === void 0) { mutationRate = 0.5; }
            this.crossoverRate = crossoverRate;
            this.mutationRate = mutationRate;
        }
        BinaryOperator.prototype.crossover = function (parent1, parent2) {
            //console.log('Crossing over');
            var childVector = [];
            if (Math.random() <= 0.5) {
                childVector = parent1.getChromosomes().slice();
                var otherParent = parent2.getChromosomes().slice();
            }
            else {
                childVector = parent2.getChromosomes().slice();
                var otherParent = parent1.getChromosomes().slice();
            }
            //console.log(childVector, ' - before crossover');
            if (Math.random() <= this.crossoverRate) {
                var randomIndex = Math.random() * childVector.length;
                for (var i = 0; i < childVector.length; i++) {
                    if (i <= randomIndex) {
                        childVector[i] = otherParent[i];
                    }
                }
            }
            return new Genomes.BitVector(childVector);
        };
        BinaryOperator.prototype.mutate = function (genome) {
            for (var i = 0; i < genome.getChromosomes().length; i++) {
                if (Math.random() <= this.mutationRate) {
                    genome.mutateChromosome(i);
                    break;
                }
            }
        };
        return BinaryOperator;
    })();
    GeneticOperators.BinaryOperator = BinaryOperator;
})(GeneticOperators || (GeneticOperators = {}));
