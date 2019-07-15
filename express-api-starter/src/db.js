const monk=require('monk');
const db=monk('localhost/guestmap',function(err, db){
    if(err){
       console.error("Db is not connected", err.message);
    }});

module.exports =db;
