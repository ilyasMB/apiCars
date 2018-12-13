const getRoot = function(req, res){
    var users =[{
        name: "Ilyas",
        lastname: "Mbasso",
        twitter:"@_ilyas_"
    }];
    let name = req.query.name;
    var responses = [];
    if(name) {
        // URLSearchParams == users!!!
        for(let i=0; i < URLSearchParams.length; i++){
            if(users[i].name == name){
                responses.push(users[i]);
            }
        }
     } else {
            responses = users;
    }
    res.header("Content-Type", "text/json");
    res.send(responses);
};

module.exports = {getRoot};