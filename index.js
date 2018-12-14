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

//Creation d'une nouvelle offre
app.put('/offer/', (req, res) => {
    var isEligibleForCreation = true;
    var myResponse = {"reference":"", "created":"201 Created"};
    var propertiesToCheck = ["reference", "name", "model", "gaz", "date", "publish_date"];

    var offer  = {
        reference : req.param('reference'),
        name : req.param('name'),
        model : req.param('model'),
        gaz : req.param('gaz'),
        date : req.param('date'),
        publish_date : req.param('publish_date'),
    }; 
    
    propertiesToCheck.forEach( prop => {
        if(! offer.hasOwnProperty(prop)){
            myResponse.created = "400 Bad Request";
            isEligibleForCreation = false;
        }
    });

    if(isEligibleForCreation){
        myResponse.reference = offer.reference;
        mysqlManager.addOffer(offer);
    }

    res.header("Content-Type", "text/json");
    res.send(myResponse);
});

// Mettre à jour une offre existante
app.post('/update/', (req, res) => {
    var myResponse = {"reference":"", "updated":"200 OK"};
    var propertiesToCheck = ["reference", "name", "model", "gaz", "date", "publish_date"];
    var isEligibleForUpdate = true;
    var offer  = {
        reference : req.param('reference'),
        name : req.param('name'),
        model : req.param('model'),
        gaz : req.param('gaz'),
        date : req.param('date'),
        publish_date : req.param('publish_date'),
    };
    propertiesToCheck.forEach( prop => {
        if(! offer.hasOwnProperty(prop)){
            myResponse.updated = "400 Bad Request";
            isEligibleForUpdate = false;
        }
    });

    if(isEligibleForUpdate){
        myResponse.reference = offer.reference;
        mysqlManager.updateOffer(offer, function(result){
            if (result.affectedRows === 0){
                myResponse.updated = "204 No content to update";
            }
            res.header("Content-Type", "text/json");
            res.send(myResponse);
        });
    } else {
        res.header("Content-Type", "text/json");
        res.send(myResponse);
    }
 
});

// Lister la liste des offres // ajouter un filtre req.param
app.get('/offers', (req, res) => {
    mysqlManager.listOffers(function(result){
        res.header("Content-Type", "text/json");
        res.send(result);
  })
 
});

// Catégoriser par model de voiture 
app.get('/model/:model', (req, res) => {
    var model = req.params.model;
    mysqlManager.listOffersPerModel(model, function(result){
        res.header("Content-Type", "text/json");
        res.send(result);
    });
});

// Supprimer une offre existante
app.delete('/offer/:reference', (req, res) => {
    var reference = req.param('reference');
    userToken = req.param('token');
    var myResponse = {"reference":reference, "deleted":"400 Bad Request"};

    mysqlManager.deleteOffer(reference, userToken, function(isDeleted){
        if (isDeleted === true){
            myResponse.deleted = "200 OK";
        } else if (isDeleted === null){
            myResponse.deleted = "Token unauthorized to delete user \ 401 Unauthorized";
        }

        res.header("Content-Type", "text/json");
        res.send(myResponse);
   });    
});

app.listen(8080, ()=>{
    console.log("started");
});