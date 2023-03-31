const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

// Names provided for use, first name is on the niceList, second is not
// "Gilbert Morar"
// "Aldous Buxley"

async function main() {
    // To simulate success and failure, past either goodName or naughtyName in lines 15 and 22
    const goodName = "Gilbert Morar";
    const naughtyName = "Lucius Malfoy";
    const index = niceList.findIndex((n) => n === goodName);

    const merkle = new MerkleTree(niceList);
    const root = merkle.getRoot();
    const proof = merkle.getProof(index);

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        name: goodName,
        proof: proof,
    });

    console.log({ gift });
}

main();

// In this file:
// Need to prove to the server that some name is in the MERKLE_ROOT on the server
