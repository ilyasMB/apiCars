var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_cars"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Database connected !");
  });


  var addOffer = function(offer){
    tableau = [];
    tableau.push(offer.reference);
    tableau.push(offer.name);
    tableau.push(offer.model);
    tableau.push(offer.gaz);
    tableau.push(offer.date);
    tableau.push(offer.publish_date);
    con.query("insert into offers values (?)", [tableau], function (err, result) {
        if (err) throw err;
        console.log("Offer inserted");
      });
  }

  var deleteOffer = function(reference, token, callback){
    con.query("select * from tokens where token = ?", token, function (selectErr, selectResult) {
        if (selectErr) throw selectErr;
        if(selectResult.length > 0){
            con.query("delete from offers where reference = ?", reference, function (err, result) {
                if (err) throw err;
                if(result.affectedRows > 0){
                   console.log("Offer deleted");
                   callback(true);
                } else {
                    callback(false);
                }
              });
        } else {
         callback(null);
        }
    });
}

  var listOffers = function(callback){
    con.query("select * from offers", function (err, result) {
        if (err) throw err;
        callback(result);
      });
  }

  var listOffersPerModel = function(model, callback){
    con.query("select * from offers where model = ?", model, function (err, result) {
        if (err) throw err;
        callback(result);
      });
  }

  var updateOffer = function(offer, callback){
    var sql = "update offers set name = '" + offer.name + "', model = '" + offer.model + "', gaz = '" + offer.gaz + "', date = '" + offer.date + "', publish_date = '" + offer.publish_date + "' where reference = " + offer.reference;
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      callback(result);
    });
  }

  module.exports = {
    addOffer,
    deleteOffer,
    listOffers,
    listOffersPerModel,
    updateOffer
  };