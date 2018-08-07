import * as functions from 'firebase-functions';
import * as Mta from 'mta-gtfs';
import * as Cors from 'cors';
const cors = Cors({
    origin:true
});

const mta = new Mta({
    key: "9855a16a7f459ecc79118f055d32996b"
});

export const viewAllStops = functions.https.onRequest(async (request, response) => {
    return cors(request, response, async () =>{
        const resp = await mta.stop();
        response.send(resp);
    });
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
        const resp = await mta.schedule(request.query.stopID, feed);
        response.send(resp);
    });
});
