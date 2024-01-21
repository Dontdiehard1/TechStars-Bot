
//Auto Generated from MongoDB Atlas
const { MongoClient, ServerApiVersion } = require('mongodb');
const {dbUser , dbPass} = require('./config.json');

const uri = "mongodb+srv://" + dbUser + ":" + dbPass + "@techstarsbottest.dhi6k1h.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version


async function rundb() {
  const dbclient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await dbclient.connect();
    // Send a ping to confirm a successful connection
    await dbclient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await dbclient.close();
  }
  return dbclient;
}

module.exports = rundb;