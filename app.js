var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var sql = require('msnodesqlv8');
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
var config="Driver={SQL Server Native Client 11.0};Server={tcp:MAYANK-PC,49172};User={mayank};Password={1234};Database={dbHRMS};Trusted_Connection={Yes};";

app.post('/login',function(req,res){

   
 sql.open(config, function (err, conn) {
      // console.log(req.body.email);
          var tableObjectValue  = new Array("SelectByUserName",req.body.email,"");
            var pm = conn.procedureMgr();
            pm.callproc('sp_SelectDeleteLogin',tableObjectValue , function(err, results, output) {
                if(err){
                    
                    console.log(err);
                }else{
                   if(results.length>0){
                      
                      sql.open(config, function (err, conn) {
     //  console.log(res.body.email);
                       //   console.log(results[0].Email);
          var tableObjectValue  = new Array("SelectByEmail",results[0].Email);
            var pm = conn.procedureMgr();
            pm.callproc('sp_SelectDeleteEmployeeDetails',tableObjectValue , function(err, result1, output) {
                if(err){
                    console.log(err);
                }else{
                   res.json({
                           type:true,
                           data:result1
                       });
                }
        });
        if(err){
            console.log('Connection Error: '+err);
        }
   
       
    
    });
                   }
                }
        });
        if(err){
            console.log('Connection Error: '+err);
        }
   
       
    
    });
    
});
              

function insertupdateuser(userid,email){
     sql.open(config, function (err, conn) {
          var tableObjectValue  = new Array(userid,email);
            var pm = conn.procedureMgr();
            pm.callproc('sp_InsertUpdateLogin',tableObjectValue , function(err, results, output) {
                if(err){
                    console.log(err);
                }else{
                    console.log(output[0]);
                    console.log(results);
                }
        });
        if(err){
            console.log('Connection Error: '+err);
        }
       
});
}
var empData=[];
function selectEmployeeDetails(email){
    sql.open(config, function (err, conn) {
     //  console.log(res.body.email);
          var tableObjectValue  = new Array("SelectByEmail",email);
            var pm = conn.procedureMgr();
            pm.callproc('sp_SelectDeleteEmployeeDetails',tableObjectValue , function(err, results, output) {
                if(err){
                    console.log(err);
                }else{
                  //  console.log(results);
                    empData = results;
                  return results;
                }
        });
        if(err){
            console.log('Connection Error: '+err);
        }
   
       
    
    });
}


/*function createGuid()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}*/
var port = process.env.PORT || 9006;


app.use(express.static("./app"));
app.use(express.static("./public"));

app.get("/", function (req, res) {
    res.sendFile( __dirname + "/src/views/" + "index.html" );
});

// Start Server
app.listen(port, function () {
    console.log("Express server listening on port " + port);
});
    