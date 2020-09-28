const express = require("express");
const router = express.Router();

const mongodb = require("mongodb");

// Connection URL
const url = "mongodb+srv://SohorTom:1234@betodb.skrep.mongodb.net/";

// Use connect method to connect to the server
async function loadTasksCollection() {
  const client = await mongodb.MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client.db("my_tasklist").collection("mytasks");
}

router.get("/", async (req, res) => {
  const data = await loadTasksCollection();
  res.send(await data.find({}).toArray());
});

router.post("/", async (req, res) => {
  const data = await loadTasksCollection();
  await data.insertOne({
    task: req.body.task,
    dateCreated: new Date(),
  });
  res.status(201).send();
});

router.delete("/:id", async (req, res) => {
  const data = await loadTasksCollection();
  await data.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});
module.exports = router;
