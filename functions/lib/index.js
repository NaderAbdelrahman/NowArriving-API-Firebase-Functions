"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const Mta = require("mta-gtfs");
const mta = new Mta({
    key: "9855a16a7f459ecc79118f055d32996b",
    feed_id: 1
});
exports.viewAllStops = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    const resp = yield mta.stop();
    response.send(resp);
}));
exports.viewSelectedStops = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    const resp = yield mta.stop(request.query.stopID);
    response.send(resp);
}));
exports.stopSchedule = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    const resp = yield mta.schedule(request.query.stopID);
    response.send(resp);
}));
//# sourceMappingURL=index.js.map