const chai = require("chai");
const path = require("path");
const crypto = require("crypto");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");

const assert = chai.assert;

const wasm_tester = require("circom_tester").wasm;


function buffer2bitArray(b) {
    const res = [];
    for (let i=0; i<b.length; i++) {
        for (let j=0; j<8; j++) {
            res.push((b[i] >> (7-j) &1));
        }
    }
    return res;
}

function bitArray2buffer(a) {
    const len = Math.floor((a.length -1 )/8)+1;
    const b = new Buffer.alloc(len);

    for (let i=0; i<a.length; i++) {
        const p = Math.floor(i/8);
        b[p] = b[p] | (Number(a[i]) << ( 7 - (i%8)  ));
    }
    return b;
}

describe("SHA256 tests: ", function() {
    this.timeout(100000);

    it("Test the correctness of converting buffers to bits-array and conversely. ", async () => {
        const b = new Buffer.alloc(64);
        for (let i=0; i<64; i++) {
            b[i] = i+1;
        }
        const a = buffer2bitArray(b);
        const b2 = bitArray2buffer(a);

        assert.equal(b.toString("hex"), b2.toString("hex"), true);
    });

    it("Test the correctness for the sha256 circuit with 304 input values. ", async () => {
        const cir = await wasm_tester(path.join(__dirname, "circuits", "sha256_test.circom"));

        const testStr = "abcdbcdecdefdefgefghfghighijhijkijkljk"
        const b = Buffer.from(testStr, "utf8");
        const inArr = buffer2bitArray(b);

        console.log(inArr.length)

        const hash = crypto.createHash("sha256")
            .update(b)
            .digest("hex");

        const witness = await cir.calculateWitness({ "in": inArr }, true);

        const arrOut = witness.slice(1, 257);
        const hash2 = bitArray2buffer(arrOut).toString("hex");

        assert.equal(hash, hash2);

    }).timeout(1000000);
});