"use strict";
exports.__esModule = true;
var Mta = require("mta-gtfs");
var mta = new Mta({
    key: "9855a16a7f459ecc79118f055d32996b"
});
var mtaRoute = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/";
// mta.schedule("H08", 26)
// 	.catch((err) => {
// 		console.error(err);
// 	})
// 	.then((res) => {
// 	console.log(res);
// });
mta.schedule("S31", 11).then(function (res) { return console.log(JSON.stringify(res)); });
