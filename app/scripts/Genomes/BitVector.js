'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="AbstractGenome.ts"/>
var Genomes;
(function (Genomes) {
    var BitVector = (function (_super) {
        __extends(BitVector, _super);
        function BitVector(chromosomes) {
            _super.call(this);
            this.chromosomes = chromosomes;
        }
        BitVector.prototype.getChromosomes = function () {
            return this.chromosomes;
        };
        BitVector.prototype.mutateChromosome = function (index) {
            this.chromosomes[index] = (this.chromosomes[index] === 1 ? 0 : this.chromosomes[index]);
        };
        return BitVector;
    })(Genomes.AbstractGenome);
    Genomes.BitVector = BitVector;
})(Genomes || (Genomes = {}));
