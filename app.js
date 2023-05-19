const express = require("express");
const schema = require("./schema");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.connect(
  "mongodb+srv://deepnrng007:T2yJRqv09xHtiEON@cluster0.8sx5jk4.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("listening for req on port 4000");
});
