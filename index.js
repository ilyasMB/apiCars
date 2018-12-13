const routes = require('./routes');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const users = require('./users');
const mysqlManager = require('./mysqlManger.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//fichier statique
app.use(express.static('files'));
app.get('/users', routes.getRoot);

var authenticationTokens = ["5JHGJ5KKH@HUH5JKJKJK"];

var offers = [
    {
        "reference" : "0",
        "name" : "BMW",
        "model" : "Serie 3",
        "gaz" : "essence",
        "date" : "2015",
        "publish_date" : "23/11/2018"
    },
    {
        "reference" : "1",
        "name" : "PORCHE",
        "model" : "Panamera",
        "gaz" : "essence",
        "date" : "2018",
        "publish_date" : "27/11/2018"
    },
    {
        "reference" : "2",
        "name" : "Volvo",
        "model" : "C35",
        "gaz" : "gazoil",
        "date" : "2017",
        "publish_date" : "25/11/2018"
    },
    {
        "reference" : "3",
        "name" : "VolksWagen",
        "model" : "golf7",
        "gaz" : "gazoil",
        "date" : "2018",
        "publish_date" : "25/11/2018"
    }
];

// Créer une offre de vente
// app.post('/offers', function(req, res)
// const voiture = req.params('voiture');
// dao.createVoiture(voiture)
app.put('/offer/', (req, res) => {
    var isEligibleForCreated = true;
    var myResponse = {"reference":"", "created":"OK"};
   // var offer  = req.params.offer;

   var offer  = {
        reference : req.param('reference'),
        name : req.param('name'),
        model : req.param('model'),
        gaz : req.param('gaz'),
        date : req.param('date'),
        publish_date : req.param('publish_date'),
        // publish_date : req.params.publish_date,
    }; 
   var propertiesToCheck = ["reference", "name", "model", "gaz", "date"];
// verifier les caractéristiques de l'offre
    propertiesToCheck.forEach( prop => {
if(! offer.hasOwnProperty(prop)){
    myResponse.created = "KO";
    isEligibleForCreated = false;
}
    });

    if(isEligibleForCreated){
        myResponse.reference = offer.reference;
      //  console.log("will add");
        //console.log({offer});
        //offers.push(offer);
        mysqlManager.add(offer);
    }

    res.header("Content-Type", "text/json");
    res.send(myResponse);
});

// Mettre à jour une offre existante
app.post('/update/:', (req, res) => {

});

// Lister la liste des offres
app.get('/list', (req, res) => {
  res.header("Content-Type", "text/json");
  res.send(offers);
});

// Catégoriser par model de voiture
app.get('/model/:model', (req, res) => {
    var offerPerModel = [];
    var model = req.params.model;
    
    offers.forEach(offer => {
        if (offer.model == model){
            offerPerModel.push(offer);
        }
    })
    res.header("Content-Type", "text/json");
    res.send(offerPerModel);
});

// Supprimer une offre existante
app.delete('/delete/:reference', (req, res) => {
    var reference = req.param('reference');
    userToken = req.param('token');
    var myResponse = {"reference":reference, "deleted":"KO"};



   mysqlManager.delete(reference, userToken, function(isDeleted){
        if (isDeleted === true){
            myResponse.deleted = "OK";
        } else if (isDeleted === null){
            myResponse.deleted = "Token unauthorized to delete user";
        }

        res.header("Content-Type", "text/json");
        res.send(myResponse);
   });
   

   
    
});

var deleteCallbackFunction = function(isDeleted, myResponse){

}

app.listen(8080, ()=>{
    console.log("started");
});