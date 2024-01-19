//Auto Generated from MongoDB Atlas

const { MongoClient, ServerApiVersion } = require('mongodb');
const {dbUser , dbPass} = require('./config.json');

const uri = "mongodb+srv://" + dbUser + ":" + dbPass + "@techstarsbottest.dhi6k1h.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

const database = client.db("TestServer");
const Teams = database.collection("Teams");

const testTeam = [
    {
        name: "Prep Core",
        members: [
            "Stone Widder",
            "Igor",
            "Bob"
        ]
    }
]

try {
    const insertResult = Teams.insertMany(testTeam);
    console.log(`${insertResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }