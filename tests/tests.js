/* Escape & Query building tests */

var settings = JSON.parse(require('fs').readFileSync('./tests/db_conf.json','utf8'));

var informix = require("../nodejs-db-informix");

var c = new informix.Database(settings);
c.connect(function(err) {
    if (err) {
        throw new Error('Could not connect to DB');
    }
    console.log('Connected to db with ');
    console.log(settings);
    console.log("isConnected() == " + c.isConnected());

    // console.log(c);
    // var q = "select * from customer order by customer_num";
    var q = "select * from units order by unit_name";
    var rs = c.query(q
        , []
        , {
            start: function(q) {
                console.log(q);
            }
            , async: false
            , cast: false
            , each: function(r) {
                console.log("XXXX");
                console.log(r);
            }
        }).execute();

    /*
    var rs = c.query().select("*").from("foo").execute({
        start: function (q) {
            console.log (q);
        }
       , async : false
    });
    */
    console.log('Result set: ');
    console.log(rs);
});



/*
var tests = require("./tests_base.js").get(function(callback) {
    new informix.Database(settings).connect(function(err) {
        if (err) {
            throw new Error('Could not connect to test DB');
        }
        console.log('Connected to db with ' + settings);
        callback(this);
    });
});

// console.log (tests);

for(var test in tests) {
    console.log(test);
    exports[test] = tests[test];
}
*/
