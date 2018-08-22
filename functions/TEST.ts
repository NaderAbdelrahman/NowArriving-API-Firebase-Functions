import * as Mta from 'mta-gtfs';

const mta = new Mta({
    key: "9855a16a7f459ecc79118f055d32996b"
});

const mtaRoute = "http://traintimelb-367443097.us-east-1.elb.amazonaws.com/";

mta.schedule("H08", 26)
	.catch((err) => {
		console.error(err);
	})
	.then((res) => {
	console.log(res);
});
