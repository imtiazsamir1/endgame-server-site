const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

var cors = require("cors");
app.use(express.json());
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fcban.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const tasksCollection = client.db("end_game").collection("tasks");

    // app.get("/task", async (req, res) => {
    // const query = {};
    // console.log(query);
    // const cursor = await tasksCollection.find(query);
    // const tasks = cursor.toArray();
    // console.log(tasks);
    // res.send(tasks);
    // });
    app.get("/task", async (req, res) => {
      const result = await tasksCollection.find({}).toArray();
      res.send(result);
    });
    app.post("/task", async (req, res) => {
      const text = req.body;
      const tasks = await tasksCollection.insertOne(text);
      res.send(tasks);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello api");
});
// Z1uhZ4ERSvv0kyOH
app.listen(port, () => {
  console.log(`listenin to port ${port}`);
});
