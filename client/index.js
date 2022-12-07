const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

// Names provided for use, first name is on the niceList, second is not
// "Gilbert Morar"
// "Aldous Buxley"

async function main() {
    // TODO: how do we prove to the server we're on the nice list?
    const name = "Gilbert Morar";
    const index = niceList.findIndex((n) => n === name);

    const merkle = new MerkleTree(niceList);
    const root = merkle.getRoot();
    const proof = merkle.getProof(index);

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        name: name,
        proof: proof,
    });

    console.log({ gift });
}

main();

// In this file:
// Need to prove to the server that some name is in the MERKLE_ROOT on the server
