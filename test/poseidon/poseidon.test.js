const chai = require("chai");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;

const buildPoseidon = require("circomlibjs").buildPoseidon;

const assert = chai.assert;

describe("Poseidon tests: ", function () {
    let poseidon;
    let F;
    let circuit2_1, circuit5_1, circuit8_4;

    this.timeout(1000000);

    before( async() => {
        poseidon = await buildPoseidon();
        F = poseidon.F;
        circuit2_1 = await wasm_tester(path.join(__dirname, "circuits", "poseidon2-1.test.circom"));
        circuit5_1 = await wasm_tester(path.join(__dirname, "circuits", "poseidon5-1.test.circom"));
        circuit8_4 = await wasm_tester(path.join(__dirname, "circuits", "poseidon8-4.test.circom"));
    });

    it("Test to check the correctness of the Poseidon hash having as inputs [1, 2]:", async () => {
        const w = await circuit2_1.calculateWitness({inputs: [1, 2]});

        const res2 = poseidon([1,2]);

        await circuit2_1.assertOut(w, {out : F.toObject(res2)});
        await circuit2_1.checkConstraints(w);
    });

    it("Test to check the correctness of the Poseidon hash having as inputs [1, 2, 3, 4, 5]:", async () => {
        const w = await circuit5_1.calculateWitness({inputs: [1, 2, 3, 4, 5]});

        const res2 = poseidon([1,2, 3, 4, 5]);

        await circuit5_1.assertOut(w, {out : F.toObject(res2)});
        await circuit5_1.checkConstraints(w);
    });

    it("Test to check the correctness of the Poseidon hash having 8 inptus and 4 outputs:", async () => {
        const inputs = [1, 2, 3, 4, 5, 6, 7, 8];
        const w = await circuit8_4.calculateWitness({inputs: inputs, initialState: 0});

        const res2 = poseidon(inputs, 0, 4);

        console.log(res2);

        const res2f = [];
        for (let i=0; i<res2.length; i++) {
            res2f[i] = F.toObject(res2[i]);
        }

        console.log(res2f);

        await circuit8_4.assertOut(w, {out : res2f});
        await circuit8_4.checkConstraints(w);
    });

});