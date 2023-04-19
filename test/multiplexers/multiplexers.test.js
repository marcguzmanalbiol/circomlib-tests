const chai = require("chai");
const path = require("path");
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");

const assert = chai.assert;

const wasm_tester = require("circom_tester").wasm;

describe("Multiplexers tests: ", function() {
    this.timeout(100000);

    before( async() => {
        mux1_circuit = await wasm_tester(path.join(__dirname, "circuits", "mux1.test.circom"));
        multimux1_circuit = await wasm_tester(path.join(__dirname, "circuits", "multimux1.test.circom"));
    });

    describe("Mux1 tests: ", function() {

        it("Test the correctness of Mux1 circuit when first input is selected. ", async () => {
            const witness = await mux1_circuit.calculateWitness({ "c": [1, 2], "s": 0 }, true);
    
            assert.equal(1, witness[1]);
    
        }).timeout(1000000);

        it("Test the correctness of Mux1 circuit when second input is selected. ", async () => {
            const witness = await mux1_circuit.calculateWitness({ "c": [1, 2], "s": 1 }, true);
    
            assert.equal(2, witness[1]);
    
        }).timeout(1000000);

    });

    describe("MultiMux1 tests: ", function() {

        it("Test the correctness of Mux1 circuit when first inputs are selected. ", async () => {
            const witness = await multimux1_circuit.calculateWitness({ "c": [[1, 2], [3, 4], [5, 6], [7, 8]], "s": 0 }, true);

            let output = witness.splice(1, 4);

            for(i=0; i<4; i++) {
                assert.equal(BigInt(2*i+1), output[i]) // the output should be [1n, 3n, 5n, 7n]
            }
    
        }).timeout(1000000);

        it("Test the correctness of Mux1 circuit when second inputs are selected. ", async () => {
            const witness = await multimux1_circuit.calculateWitness({ "c": [[1, 2], [3, 4], [5, 6], [7, 8]], "s": 1 }, true);

            let output = witness.splice(1, 4);

            for(i=0; i<4; i++) {
                assert.equal(BigInt(2*i+2), output[i]) // the output should be [2n, 4n, 6n, 8n]
            }
    
        }).timeout(1000000);

    });

});