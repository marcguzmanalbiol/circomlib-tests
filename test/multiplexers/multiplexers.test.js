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
        mux2_circuit = await wasm_tester(path.join(__dirname, "circuits", "mux2.test.circom"));
        multimux2_circuit = await wasm_tester(path.join(__dirname, "circuits", "multimux2.test.circom"));
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

        it("Test the correctness of MultiMux1 circuit when first inputs are selected. ", async () => {
            const witness = await multimux1_circuit.calculateWitness({ "c": [[1, 2], [3, 4], [5, 6], [7, 8]], "s": 0 }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [1n, 3n, 5n, 7n];

            for(i=0; i<4; i++) {
                assert.equal(expectedOutput[i], output[i])
            }
    
        }).timeout(1000000);

        it("Test the correctness of MultiMux1 circuit when second inputs are selected. ", async () => {
            const witness = await multimux1_circuit.calculateWitness({ "c": [[1, 2], [3, 4], [5, 6], [7, 8]], "s": 1 }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [2n, 4n, 6n, 8n];

            for(i=0; i<4; i++) {
                assert.equal(expectedOutput[i], output[i])
            }
    
        }).timeout(1000000);

    });

    describe("Mux2 tests: ", function() {

        it("Test the correctness of Mux2 circuit when the first input is selected. ", async () => {
            const witness = await mux2_circuit.calculateWitness({ "c": [1, 2, 3, 4], "s": [0, 0] }, true);

            assert.equal(1, witness[1]);

        }).timeout(1000000);

        it("Test the correctness of Mux2 circuit when the second input is selcted. ", async () => {
            const witness = await mux2_circuit.calculateWitness({ "c": [1, 2, 3, 4], "s": [1, 0] }, true);

            assert.equal(2, witness[1]);

        }).timeout(1000000);

        it("Test the correctness of Mux2 circuit when the third input is selcted. ", async () => {
            const witness = await mux2_circuit.calculateWitness({ "c": [1, 2, 3, 4], "s": [0, 1] }, true);

            assert.equal(3, witness[1]);

        }).timeout(1000000);

        it("Test the correctness of Mux2 circuit when the fourth input is selcted. ", async () => {
            const witness = await mux2_circuit.calculateWitness({ "c": [1, 2, 3, 4], "s": [1, 1] }, true);

            assert.equal(4, witness[1]);

        }).timeout(1000000);

    });

    describe("MultiMux2 tests: ", function() {

        it("Test the correctness of MultiMux2 circuit when the first inputs are selected. ", async () => {
            const witness = await multimux2_circuit.calculateWitness({ "c": [
                [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]
            ], "s": [0, 0] }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [1n, 5n, 9n, 13n];

            for(i=0; i<4;i++) {
                assert.equal(expectedOutput[i], output[i]);
            }

        }).timeout(1000000);

        it("Test the correctness of MultiMux2 circuit when the second inputs are selected. ", async () => {
            const witness = await multimux2_circuit.calculateWitness({ "c": [
                [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]
            ], "s": [1, 0] }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [2n, 6n, 10n, 14n];

            for(i=0; i<4;i++) {
                assert.equal(expectedOutput[i], output[i]);
            }

        }).timeout(1000000);

        it("Test the correctness of MultiMux2 circuit when the third inputs are selected. ", async () => {
            const witness = await multimux2_circuit.calculateWitness({ "c": [
                [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]
            ], "s": [0, 1] }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [3n, 7n, 11n, 15n];

            for(i=0; i<4;i++) {
                assert.equal(expectedOutput[i], output[i]);
            }

        }).timeout(1000000);

        it("Test the correctness of MultiMux2 circuit when the fourth inputs are selected. ", async () => {
            const witness = await multimux2_circuit.calculateWitness({ "c": [
                [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]
            ], "s": [1, 1] }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [4n, 8n, 12n, 16n];

            for(i=0; i<4;i++) {
                assert.equal(expectedOutput[i], output[i]);
            }

        }).timeout(1000000);

    });

});