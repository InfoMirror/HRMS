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
var config="Driver={SQL Server Native Client 11.0};Server={tcp:MAYANK-PC,49172};User={mayank};Password={1234};Database={dbHRMS};";/*{
    user:'mayank',
    password:'1234',
    server:'.',
    database:'dbHRMS',
    options:{
        encrypt:false
    }
    
};
*/ /*var conn_str = "Driver={SQL Server Native Client 11.0};Server={.\\SQLEXPRESS};Database={temp_detail};Trusted_Connection={Yes};";*/
/*ar query = sql.query(config,'SELECT * tblLogin',function (err, results){

            if (results.length) {
                 
              console.log('connected');
                console.log(results);


            }

        });*/
  


        // set up the query listeners
   /*     query
        .on('error', function(err) {
            // Handle error, and 'end' event will be emitted after this as well
            console.log( err );
          
        
        });*/

app.post('/login',function(res,req){

   
/*var query = sql.query(config,'SELECT * tblLogin where email='+res.body.email ,function (err, results){
//console.log(results);
            if (results!==undefined) {
                 
              console.log('connected');
                console.log(results);


            }else{
                // var uuid=createGuid();
    //var datetime=new Date();
                var queryStr = 'insert into DBO.tblLogin (Email) values ('+res.body.email+')';
                //queryStr= queryStr.replace('#',res.body.email);
                //console.log(queryStr);
                  sql.query(config,queryStr, function(err, recordset) {
        // ... error checks 
 console.log(err);
      
    });
            }

        });*/
    sql.open(config, function (err, conn) {
        if(err){
            console.log('Connection Error: '+err);
        }
        /*var tableObjectValue = {RoleName: 'Hello World'};
        var query = 'sp_InsertUpdateRole';
        conn.query(query,[RoleName: 'Hello World'],function(err,result){
            if(err){
                console.log('Error running insert'+err);
            }
        });*/
        var tableObjectValue  = new Array(123,"Volvo");
            var pm = conn.procedureMgr();
            pm.callproc('sp_InsertUpdateRole',tableObjectValue , function(err, results, output) {
                if(err){
                    console.log(err);
                }else{
                    console.log(output);
                }
        });
    });
  
    /*//var request=new sql.Request();
    var ps= new sql.PreparedStatment();
    ps.input('email',sql.VarChar);
    ps.prepare('select * from tbllogin where email=@email',
               function(err){
        ps.execute({email:req.body.email},
                  function(err,recordSet){
            if(recordSet===null){
                insertUser(req.body.email);
            }
        });
        
});*/
    
 
    
});




function createGuid()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
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