const chai = require("chai");
const path = require("path");
const crypto = require("crypto");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");

const assert = chai.assert;

const wasm_tester = require("circom_tester").wasm;

describe("Comparators tests: ", function() {
    this.timeout(100000);

    before( async() => {
        lessthan_circuit = await wasm_tester(path.join(__dirname, "circuits", "lessthan.test.circom"));
        lesseqthan_circuit = await wasm_tester(path.join(__dirname, "circuits", "lesseqthan.test.circom"));
        isequal_circuit = await wasm_tester(path.join(__dirname, "circuits", "isequal.test.circom"));
    });

    describe("LessThan tests: ", function() {
        it("Test the correctness LessThan circuit when first input is less than the second one. ", async () => {
            const witness = await lessthan_circuit.calculateWitness({ "in": [1, 2] }, true);
    
            assert.equal(1, witness[1]);
    
        }).timeout(1000000);
    
        it("Test the correctness LessThan circuit when inputs are equal. ", async () => {
            const witness = await lessthan_circuit.calculateWitness({ "in": [2, 2] }, true);
    
            assert.equal(0, witness[1]);
    
        }).timeout(1000000);
    
        it("Test the correctness LessThan when first input is greater than the second one. ", async () => {
            const witness = await lessthan_circuit.calculateWitness({ "in": [2, 1] }, true);
    
            assert.equal(0, witness[1]);
    
        }).timeout(1000000);
    });
    

    describe("LessEqThan tests ", function() {
        it("Test the correctness LessEqThan circuit when first input is less than the second one. ", async () => {
            const witness = await lesseqthan_circuit.calculateWitness({ "in": [1, 2] }, true);
    
            assert.equal(1, witness[1]);
    
        }).timeout(1000000);
    
        it("Test the correctness LessEqThan circuit when inputs are equal. ", async () => {
            const witness = await lesseqthan_circuit.calculateWitness({ "in": [2, 2] }, true);
    
            assert.equal(1, witness[1]);
    
        }).timeout(1000000);
    
        it("Test the correctness LessEqThan when first input is greater than the second one. ", async () => {
            const witness = await lesseqthan_circuit.calculateWitness({ "in": [2, 1] }, true);
    
            assert.equal(0, witness[1]);
    
        }).timeout(1000000);
    });

    describe("IsEqual tests ", function() {
        it("Test the correctness IsEqual circuit when first input is less than the second one. ", async () => {
            const witness = await isequal_circuit.calculateWitness({ "in": [1, 2] }, true);
    
            assert.equal(0, witness[1]);
    
        }).timeout(1000000);
    
        it("Test the correctness IsEqual circuit when inputs are equal. ", async () => {
            const witness = await isequal_circuit.calculateWitness({ "in": [2, 2] }, true);
    
            assert.equal(1, witness[1]);
    
        }).timeout(1000000);
    
        it("Test the correctness IsEqual when first input is greater than the second one. ", async () => {
            const witness = await isequal_circuit.calculateWitness({ "in": [2, 1] }, true);
    
            assert.equal(0, witness[1]);
    
        }).timeout(1000000);
    });
    
});