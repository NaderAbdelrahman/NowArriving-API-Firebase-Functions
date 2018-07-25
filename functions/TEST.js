const Mta = require('mta-gtfs');
const mta = new Mta({
    key: "9855a16a7f459ecc79118f055d32996b",
    feed_id: 1
});

async function test() {
    console.log(JSON.stringify(await mta.schedule(635, 1)));
}

test();