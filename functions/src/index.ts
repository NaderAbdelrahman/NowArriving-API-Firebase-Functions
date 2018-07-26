import * as functions from 'firebase-functions';
import * as Mta from 'mta-gtfs';
import * as Cors from 'cors';
const cors = Cors({
    origin:true
});

const mta = new Mta({
    key: "9855a16a7f459ecc79118f055d32996b",
    feed_id: 1
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
        const resp = await mta.schedule(request.query.stopID);
        response.send(resp);
    });
});