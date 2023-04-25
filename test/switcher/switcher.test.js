const chai = require("chai");
const path = require("path");
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");

const assert = chai.assert;

const wasm_tester = require("circom_tester").wasm;

describe("Switcher tests: ", function() {
    this.timeout(100000);

    before( async() => {
        switcher_circuit = await wasm_tester(path.join(__dirname, "circuits", "switcher.test.circom"));
    });    

    it("Test the correctness of Switcher circuit when switch selector is deactivated. ", async () => {
        const witness = await switcher_circuit.calculateWitness({ "L": 1, "R": 2, "sel": 0}, true);

        assert.equal(1n, witness[1]);
        assert.equal(2n, witness[2]);

    }).timeout(1000000);

    it("Test the correctness of Switcher circuit when switch selector is activated. ", async () => {
        const witness = await switcher_circuit.calculateWitness({ "L": 1, "R": 2, "sel": 1}, true);

        assert.equal(1n, witness[2]);
        assert.equal(2n, witness[1]);

    }).timeout(1000000);

});