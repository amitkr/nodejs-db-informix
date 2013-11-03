/* tests */

/*
 * Connection configurations
 */
// var settings = JSON.parse(require('fs').readFileSync('./tests/db_conf.json','utf8'));
var settings = { 
      "host": ""
    , "user": ""
    , "password": ""
    , "database": "sysmaster"
    , "charset": ""
    // , "port": ""
    // , "compress": ""
    // , "initCommand": ""
    // , "readTimeout": ""
    // , "reconnect": ""
    // , "socket": ""
    // , "sslVerifyServer": ""
    // , "timeout": ""
    // , "writeTimeout": ""
};

/*
 * Create an Informix database nodejs object
 */
var bindings = require("../nodejs-db-informix");
console.log(bindings);

/*
 * Create a new Informix database bindings. Setup event callbacks. Connect to
 * the database.
 * c - connection
 */
var c = new bindings.Informix(settings);
c.on('error', function(error) {
    console.log("Error: ");
    console.log(error);
}).on('ready', function(server) {
    console.log("Connection ready to ");
    console.log(server);
}).connect(function(err) {
    if (err) {
        throw new Error('Could not connect to DB');
    }
    console.log('Connected to db with ');
    console.log(settings);
    console.log("isConnected() == " + c.isConnected());

    var rs;

    rs = this
        .on('each', function(e, idx, more) {
            console.log('each');
            console.log(arguments);
        })
        .on('success', function() {
            console.log('success');
            console.log(arguments);
        })
        .query(
              ""
            , []
            , function (status, results) {
                console.log('CALLBACK:');
                // console.log(arguments);
                console.log("status:" + status);
                console.log(results);
            }
            , {
                start: function(q) {
                    console.log('START:');
                    console.log(q);
                }
                , finish: function(f) {
                    console.log('Finish:');
                    console.log(f);
                }
                , async: true
                , cast: true
            }
        )
        .select("*")
        .first(10)
        .from("systables", false)
        .orderby("desc")
        .execute();

    console.log(rs);

    rs = this
        .query(
              ""
            , []
            , function (status, results) {
                console.log('CALLBACK:');
                // console.log(arguments);
                console.log("status:" + status);
                console.log(results);
            }
            , {
                start: function(q) {
                    console.log('START:');
                    console.log(q);
                }
                , finish: function(f) {
                    console.log('Finish:');
                    console.log(f);
                }
                , async: true
                , cast: true
            }
        )
        .select("*")
        .first(10)
        .from("sysprocedures", false)
        .execute();

});

console.log('connection:');
console.log(c);
