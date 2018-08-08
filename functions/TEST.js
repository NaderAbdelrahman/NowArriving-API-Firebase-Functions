const http = require('http');
const protobuf = require('protobufjs');

let key = "9855a16a7f459ecc79118f055d32996b";

let feed1 = `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=1`;

async function feed1GTFS() {

	let transit = protobuf.load("nyct-subway.proto");
		// .build("transit_realtime");

	http.get(feed1, parse);

	function parse(res) {
		let data = [];
		res.on("data", (chunk) => {
			data.push(chunk);
		});
		res.on("end", () => {
			data = Buffer.concat(data);
			let msg = transit.decode(data);
			console.log(msg);
		});
	}

}
feed1GTFS();

