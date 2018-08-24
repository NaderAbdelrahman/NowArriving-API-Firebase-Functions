"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mta = require("mta-gtfs");
var mta = new Mta({
    key: "9855a16a7f459ecc79118f055d32996b"
});
var mtaRoute = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/";
mta.schedule("H08", 26)
    .catch(function (err) {
    console.error(err);
})
    .then(function (res) {
    console.log(res);
});
