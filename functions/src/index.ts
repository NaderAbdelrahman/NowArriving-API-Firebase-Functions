import * as functions from 'firebase-functions';
import * as Mta from 'mta-gtfs';
import * as Cors from 'cors';
import * as got from 'got';
let counter = 0;
const cors = Cors({
    origin:true
});

const mta = new Mta({
    key: "9855a16a7f459ecc79118f055d32996b"
});

const mtaRoute = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/";

// 3 hrs = 10800000 milliseconds
const CACHE_LIFE = 10800000;

interface ExpirableCacheEntry {
    bodyJSON: string;
    life: number;
}

const cache: Record<string, ExpirableCacheEntry> = {};

export const getStopsByLine = functions.https.onRequest((request, response) => {
    return cors (request, response, async () => {
        counter++;
        const line = request.query.line;
        if (cache[line] == null || Date.now() >= cache[line].life) {
            let resp = await got(`${mtaRoute}getStationsByLine/${line}`);
            if (resp.statusCode === 500) {
                for (let i = 0; i < 10; i++) {
                    resp = await got(`${mtaRoute}getStationsByLine/${line}`);
                    if(resp.statusCode !== 500) {
                        break;
                    }
                }
            }
            if (resp.statusCode === 500){
                console.error("500 ERROR");
            }
            const { body: bodyJSON } = await got(`${mtaRoute}getStationsByLine/${line}`);
            cache[line] = {
                bodyJSON,
                life: Date.now() + CACHE_LIFE
            };
            response.send(cache[line].bodyJSON);
        }else if(cache[line].life > Date.now()) {
            response.send(cache[line].bodyJSON);
        }
    })
});

export const viewSelectedStops = functions.https.onRequest(async (request, response) => {
    return cors(request, response, async () =>{
        const resp = await mta.stop(request.query.stopID);
        response.send(resp);
    });
});

export const stopSchedule = functions.https.onRequest(async (request, response) => {
    return cors(request, response, async () =>{
        let feed: number = 0;
        if ((request.query.line === "S" && request.query.stopID === "901") || (request.query.line === "S" && request.query.stopID === "902")) {
            feed = 1;
        } else {
            switch (request.query.line) {
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6": {
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
                case "E":
                case "S": {
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
        }

        const resp = await mta.schedule(request.query.stopID, feed);
        console.log(resp);
        response.send(resp);
    });
});
