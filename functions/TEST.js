// import {Message} from "protobufjs";

const fs = require('fs');
const axios = require('axios');
const protobuf = require('protobufjs');
// const mta = new Mta({
//     key: "9855a16a7f459ecc79118f055d32996b"
// });
//
// async function test() {
//     // console.log(JSON.stringify(await mta.schedule("124", 1)));
// 	console.log(JSON.stringify(await mta.status('subway')));
// }
let key = "9855a16a7f459ecc79118f055d32996b";

let feed1 = `http://datamine.mta.info/mta_esi.php?key=${key}&feed_id=1`;

async function test() {

	let tmp = await axios.get(feed1);
	// console.log(tmp.data);
	protobuf.Message.decode(tmp.data);

	// let tmp = (await axios.get(feed1)).verify();
	// fs.writeFileSync("GTFSOUT.html", tmp);

}

test();