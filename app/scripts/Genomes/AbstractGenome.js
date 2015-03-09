'use strict';
var Genomes;
(function (Genomes) {
    var AbstractGenome = (function () {
        function AbstractGenome(initialFitness) {
            if (initialFitness === void 0) { initialFitness = 0; }
            this.fitness = initialFitness;
        }
        AbstractGenome.prototype.setFitness = function (fitness) {
            this.fitness = fitness;
        };
        AbstractGenome.prototype.getFitness = function () {
            return this.fitness;
        };
        return AbstractGenome;
    })();
    Genomes.AbstractGenome = AbstractGenome;
})(Genomes || (Genomes = {}));
