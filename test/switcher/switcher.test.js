const chai = require("chai");
const path = require("path");
const Scalar = require("ffjavascript").Scalar;
const F1Field = require("ffjavascript").F1Field;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

const wasm_tester = require("circom_tester").wasm;

describe("Switcher tests: ", function() {
    this.timeout(100000);

    before( async() => {
        switcher_circuit = await wasm_tester(path.join(__dirname, "circuits", "switcher.test.circom"));
    });    

    it("Test the correctness of Switcher circuit when switch selector is deactivated. ", async () => {
        const witness = await switcher_circuit.calculateWitness({
            "L": Fr.e("1"), "R": Fr.e("2"), "sel": Fr.e("0")
        }, true);

        assert.equal(Fr.e("1"), witness[1]);
        assert.equal(Fr.e("2"), witness[2]);

    }).timeout(1000000);

    it("Test the correctness of Switcher circuit when switch selector is activated. ", async () => {
        const witness = await switcher_circuit.calculateWitness({
            "L": Fr.e("1"), "R": Fr.e("2"), "sel": Fr.e("1")
        }, true);

        assert.equal(Fr.e("1"), witness[2]);
        assert.equal(Fr.e("2"), witness[1]);

    }).timeout(1000000);

});