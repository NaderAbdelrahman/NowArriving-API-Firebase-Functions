const Mta = require('mta-gtfs');
const mta = new Mta({
    key: "9855a16a7f459ecc79118f055d32996b"
});

async function test() {
    console.log(JSON.stringify(await mta.schedule("142", 1)));
}

test();