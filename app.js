const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.get("/helpPoorChildrenHaveBrightFuture", function(req, res){
  res.sendFile(__dirname + "/helpPoorChildrenHaveBrightFuture.html");
})

app.get("/helpStreetChildrenFulfillTheirDreams", function(req, res){
  res.sendFile(__dirname + "/helpStreetChildrenFulfillTheirDreams.html");
})

app.get("/issuesThatUnderprivilegedChildrenHaveToDealWith", function(req, res){
  res.sendFile(__dirname + "/issuesThatUnderprivilegedChildrenHaveToDealWith.html");
})

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const queryData = {
  name: "",
  mobNumber: "",
  email: "",
  getInvolvedIn: ""
}

app.post("/", function(req, res){
  queryData.name = req.body.lname;
  queryData.mobNumber = req.body.lphone;
  queryData.email = req.body.lemail;
  queryData.getInvolvedIn = req.body.lselect;

  db.collection('Call Me').doc(queryData.name).set(queryData).then(() =>{
    console.log('new qurey added to Call Me db');
  });
})

app.listen(3000, function(){
  console.log("server started on port 3000");
});
