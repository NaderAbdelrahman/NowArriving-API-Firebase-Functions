
import * as Cors from 'cors';
import * as requestMod from 'request';
const cors = Cors({
    origin:true
});
const request = require('request');

let feed1 = `http://traintimelb-367443097.us-east-1.elb.amazonaws.com/getStationsByLine/6`;

const CACHE_DURATION = 180e3;

const mtaRoute = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/";
let cache: Record<string, ExpirableCacheEntry> = {};

interface ExpirableCacheEntry {
    bodyJSON: string;
    timestamp: number;
}

const line = 6;
// if (cache == null) {
// 	console.log("YER");
// } else
	if (cache[line] == undefined || cache[line].timestamp < Date.now() + CACHE_DURATION) {
		requestMod.get(mtaRoute + "getStationsByLine/" + line, (e, r, b) => {
			console.log(b);
			cache[line].bodyJSON = b;
			cache[line].timestamp = Date.now();
			console.log(cache[line].bodyJSON);
		});
        // const resp = cache[line].bodyJSON;
        // console.log(resp);
	}
