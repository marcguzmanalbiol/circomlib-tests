const chai = require("chai");
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

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
            const witness = await mux1_circuit.calculateWitness({ "c": [
                Fr.e("1"), 
                Fr.e("2")
            ], "s": Fr.e("0")}, true);
    
            assert.equal(Fr.e("1"), witness[1]);
    
        }).timeout(1000000);

        it("Test the correctness of Mux1 circuit when second input is selected. ", async () => {
            const witness = await mux1_circuit.calculateWitness({ "c": [
                Fr.e("1"), 
                Fr.e("2")
            ], "s": Fr.e("1") }, true);
    
            assert.equal(Fr.e("2"), witness[1]);
    
        }).timeout(1000000);

    });

    describe("MultiMux1 tests: ", function() {

        it("Test the correctness of MultiMux1 circuit when first inputs are selected. ", async () => {

            const witness = await multimux1_circuit.calculateWitness({ "c": [
                [Fr.e("1"), Fr.e("2")], 
                [Fr.e("3"), Fr.e("4")], 
                [Fr.e("5"), Fr.e("6")], 
                [Fr.e("7"), Fr.e("8")]
            ], "s": Fr.e("0") }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [Fr.e("1"), Fr.e("3"), Fr.e("5"), Fr.e("7")];

            for(i=0; i<4; i++) {
                assert.equal(expectedOutput[i], output[i])
            }
    
        }).timeout(1000000);

        it("Test the correctness of MultiMux1 circuit when second inputs are selected. ", async () => {
            const witness = await multimux1_circuit.calculateWitness({ "c": [
                [Fr.e("1"), Fr.e("2")], 
                [Fr.e("3"), Fr.e("4")], 
                [Fr.e("5"), Fr.e("6")], 
                [Fr.e("7"), Fr.e("8")]
            ], "s": Fr.e("1") }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [Fr.e("2"), Fr.e("4"), Fr.e("6"), Fr.e("8")];

            for(i=0; i<4; i++) {
                assert.equal(expectedOutput[i], output[i])
            }
    
        }).timeout(1000000);

    });

    describe("Mux2 tests: ", function() {

        it("Test the correctness of Mux2 circuit when the first input is selected. ", async () => {
            const witness = await mux2_circuit.calculateWitness({ "c": [
                Fr.e("1"), Fr.e("2"), Fr.e("3"), Fr.e("4")
            ], "s": [Fr.e("0"), Fr.e("0")] }, true);

            assert.equal(Fr.e("1"), witness[1]);

        }).timeout(1000000);

        it("Test the correctness of Mux2 circuit when the first input is selected. ", async () => {
            const witness = await mux2_circuit.calculateWitness({ "c": [
                Fr.e("1"), Fr.e("2"), Fr.e("3"), Fr.e("4")
            ], "s": [Fr.e("1"), Fr.e("0")] }, true);

            assert.equal(Fr.e("2"), witness[1]);

        }).timeout(1000000);

        it("Test the correctness of Mux2 circuit when the first input is selected. ", async () => {
            const witness = await mux2_circuit.calculateWitness({ "c": [
                Fr.e("1"), Fr.e("2"), Fr.e("3"), Fr.e("4")
            ], "s": [Fr.e("0"), Fr.e("1")] }, true);

            assert.equal(Fr.e("3"), witness[1]);

        }).timeout(1000000);

        it("Test the correctness of Mux2 circuit when the first input is selected. ", async () => {
            const witness = await mux2_circuit.calculateWitness({ "c": [
                Fr.e("1"), Fr.e("2"), Fr.e("3"), Fr.e("4")
            ], "s": [Fr.e("1"), Fr.e("1")] }, true);

            assert.equal(Fr.e("4"), witness[1]);

        }).timeout(1000000);

    });

    describe("MultiMux2 tests: ", function() {

        it("Test the correctness of MultiMux2 circuit when the first inputs are selected. ", async () => {
            const witness = await multimux2_circuit.calculateWitness({ "c": [
                [Fr.e("1"), Fr.e("2"), Fr.e("3"), Fr.e("4")], 
                [Fr.e("5"), Fr.e("6"), Fr.e("7"), Fr.e("8")], 
                [Fr.e("9"), Fr.e("10"), Fr.e("11"), Fr.e("12")], 
                [Fr.e("13"), Fr.e("14"), Fr.e("15"), Fr.e("16")]
            ], "s": [Fr.e("0"), Fr.e("0")] }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [Fr.e("1"), Fr.e("5"), Fr.e("9"), Fr.e("13")];

            for(i=0; i<4;i++) {
                assert.equal(expectedOutput[i], output[i]);
            }

        }).timeout(1000000);

        it("Test the correctness of MultiMux2 circuit when the first inputs are selected. ", async () => {
            const witness = await multimux2_circuit.calculateWitness({ "c": [
                [Fr.e("1"), Fr.e("2"), Fr.e("3"), Fr.e("4")], 
                [Fr.e("5"), Fr.e("6"), Fr.e("7"), Fr.e("8")], 
                [Fr.e("9"), Fr.e("10"), Fr.e("11"), Fr.e("12")], 
                [Fr.e("13"), Fr.e("14"), Fr.e("15"), Fr.e("16")]
            ], "s": [Fr.e("1"), Fr.e("0")] }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [Fr.e("2"), Fr.e("6"), Fr.e("10"), Fr.e("14")];

            for(i=0; i<4;i++) {
                assert.equal(expectedOutput[i], output[i]);
            }

        }).timeout(1000000);

        it("Test the correctness of MultiMux2 circuit when the first inputs are selected. ", async () => {
            const witness = await multimux2_circuit.calculateWitness({ "c": [
                [Fr.e("1"), Fr.e("2"), Fr.e("3"), Fr.e("4")], 
                [Fr.e("5"), Fr.e("6"), Fr.e("7"), Fr.e("8")], 
                [Fr.e("9"), Fr.e("10"), Fr.e("11"), Fr.e("12")], 
                [Fr.e("13"), Fr.e("14"), Fr.e("15"), Fr.e("16")]
            ], "s": [Fr.e("0"), Fr.e("1")] }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [Fr.e("3"), Fr.e("7"), Fr.e("11"), Fr.e("15")];

            for(i=0; i<4;i++) {
                assert.equal(expectedOutput[i], output[i]);
            }

        }).timeout(1000000);

        it("Test the correctness of MultiMux2 circuit when the first inputs are selected. ", async () => {
            const witness = await multimux2_circuit.calculateWitness({ "c": [
                [Fr.e("1"), Fr.e("2"), Fr.e("3"), Fr.e("4")], 
                [Fr.e("5"), Fr.e("6"), Fr.e("7"), Fr.e("8")], 
                [Fr.e("9"), Fr.e("10"), Fr.e("11"), Fr.e("12")], 
                [Fr.e("13"), Fr.e("14"), Fr.e("15"), Fr.e("16")]
            ], "s": [Fr.e("1"), Fr.e("1")] }, true);

            let output = witness.splice(1, 4);
            let expectedOutput = [Fr.e("4"), Fr.e("8"), Fr.e("12"), Fr.e("16")];

            for(i=0; i<4;i++) {
                assert.equal(expectedOutput[i], output[i]);
            }

        }).timeout(1000000);

    });

});