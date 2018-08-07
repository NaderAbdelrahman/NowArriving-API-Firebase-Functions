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
const Cors = require("cors");
const cors = Cors({
    origin: true
});
const mta = new Mta({
    key: "9855a16a7f459ecc79118f055d32996b"
});
exports.viewAllStops = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    return cors(request, response, () => __awaiter(this, void 0, void 0, function* () {
        const resp = yield mta.stop();
        response.send(resp);
    }));
}));
exports.viewSelectedStops = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    return cors(request, response, () => __awaiter(this, void 0, void 0, function* () {
        const resp = yield mta.stop(request.query.stopID);
        response.send(resp);
    }));
}));
exports.stopSchedule = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    return cors(request, response, () => __awaiter(this, void 0, void 0, function* () {
        let feed = 0;
        switch (request.query.line) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "S": {
                feed = 1;
                break;
            }
            case "L": {
                feed = 2;
                break;
            }
            case "N":
            case "Q":
            case "R":
            case "W": {
                feed = 16;
                break;
            }
            case "A":
            case "C":
            case "E": {
                feed = 26;
                break;
            }
            case "B":
            case "D":
            case "F":
            case "M": {
                feed = 21;
                break;
            }
            // todo: SIR Schedule
            case "SIR": {
                feed = 11;
                break;
            }
            case "G": {
                feed = 31;
                break;
            }
            case "J":
            case "Z": {
                feed = 36;
                break;
            }
            case "7": {
                feed = 51;
                break;
            }
        }
        const resp = yield mta.schedule(request.query.stopID, feed);
        response.send(resp);
    }));
}));
//# sourceMappingURL=index.js.map