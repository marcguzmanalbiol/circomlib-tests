const chai = require("chai");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;

const buildPoseidon = require("circomlibjs").buildPoseidon;

const assert = chai.assert;

describe("Poseidon tests: ", function () {
    let poseidon;
    let F;
    let circuit;

    this.timeout(1000000);

    before( async() => {
        poseidon = await buildPoseidon();
        F = poseidon.F;
        circuit2_1 = await wasm_tester(path.join(__dirname, "circuits", "poseidon2-1_test.circom"));
        circuit5_1 = await wasm_tester(path.join(__dirname, "circuits", "poseidon5-1_test.circom"));
    });

    it("Test to check the correctness of the Poseidon hash having as inputs [1, 2]:", async () => {
        const w = await circuit2_1.calculateWitness({inputs: [1, 2]});

        const res2 = poseidon([1,2]);

        assert(F.eq(F.e(w), F.e(res2)));
        await circuit2_1.assertOut(w, {out : F.toObject(res2)});
        await circuit2_1.checkConstraints(w);
    });

    it("Test to check the correctness of the Poseidon hash having as inputs [1, 2, 3, 4, 5]:", async () => {
        const w = await circuit5_1.calculateWitness({inputs: [1, 2, 3, 4, 5]});

        const res2 = poseidon([1,2, 3, 4, 5]);

        // assert(F.eq(F.e("7853200120776062878684798364095072458815029376092732009249414926327459813530"), F.e(res2)));
        await circuit5_1.assertOut(w, {out : F.toObject(res2)});
        await circuit5_1.checkConstraints(w);
    });

});