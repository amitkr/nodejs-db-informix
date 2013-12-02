/* informix cli using nodejs-db-informix */

var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

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
 * Create a new Informix database bindings. Setup event callbacks. Connect to
 * the database.
 * c - connection
 */
function connect(settings) {
    if (!settings || typeof(settings) !== 'object') {
        throw new Error("No settings provided");
    }

    /*
     * Create an Informix database nodejs object
     */
    var bindings = require("../nodejs-db-informix");
    console.log(bindings);

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

        this
        .on('each', function(e, idx, more) {
            console.log('each');
            console.log(arguments);
        })
        .on('success', function() {
            console.log('success');
            console.log(arguments);
        });

        /*
        var rs = this.query("select first 10 * from systables", function(s,r) {
            console.log(s);
            console.log(r);
        }).execute();
        */

        /*
        var rs = this
                .query(
                      "SELECT FIRST 10 * FROM systables"
                    , []
                    , function (status, results) {
                        console.log('CALLBACK:');
                        // console.log(arguments);
                        console.log("status:" + status);
                        console.log(results);
                    }
                    , {
                        start: function(q) {
                            console.log('Query:');
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
                .execute();
        */

        /*
        var rs = this
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
                            console.log('Query:');
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
                .execute();
        */

    });

    return c;
}

function execQuery(conn,qry) {
    if (!conn || conn == undefined || conn == null) {
        throw Error("_main: connection is not valid");
    }
    var rs = conn
        .query(
              qry
            , []
            , function (status, results) {
                console.log('CALLBACK:');
                // console.log(arguments);
                console.log("status:" + status);
                console.log(results);
            }
            , {
                start: function(q) {
                    console.log('Query:');
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
        .execute();

    return rs;
}

function _main () {
    var conn = connect(settings);

    if (!conn || conn == undefined || conn == null) {
        throw Error("_main: connection is not valid");
    }

    console.log('connection:');
    console.log(conn);

    rl.setPrompt('inf> ');
    rl.prompt();

    rl.on('line', function(line) {
        var cmd = line.trim();

        if (cmd == '' || cmd == undefined || cmd == null) {
            rl.prompt();
            return;
        }

        var c_reg = /^\s*connect\s+(\w+)/;

        if (c_reg.test(cmd)) {
            var m = cmd.match(c_reg);
            var db = m[1];
            if (db == null || db == undefined || db.trim() == '') {
                console.log("Invalid command: " + cmd);
                rl.prompt();
                return;
            }

            conn.disconnect();
            settings.database = db;
            conn = connect(settings);

        } else {
            execQuery(conn, cmd);
        }

        rl.prompt();

    }).on('close', function() {
        console.log('Exit.');
    });
}

_main();
