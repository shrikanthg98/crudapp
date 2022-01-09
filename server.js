const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const connectionString =
	"mongodb+srv://crudapp:crudapp1@cluster0.deby7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(connectionString, { useUnifiedTopology: true })
	.then((client) => {
		console.log("connected to mongodb atlas!");

		const db = client.db("star-wars-quotes");
		const quotesCollection = db.collection("quotes");

		app.get("/", (req, res) => {
			db.collection("quotes")
				.find()
				.toArray()
				.then((results) => {
					console.log(results);
				})
				.catch((error) => console.error(error));

			res.sendFile(__dirname + "/index.html");
		});

		app.post("/quotes", (req, res) => {
			quotesCollection
				.insertOne(req.body)
				.then((result) => {
					console.log(result);
					res.redirect("/");
				})
				.catch((error) => console.error(error));
		});

		app.listen(3000, () => {
			console.log(`listening on port 3000`);
		});
	})
	.catch(console.error);
