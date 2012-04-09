
/*
 * @public {EventEmitter} ee event emitter
 * @public {informix_bindings} ib informix bindings
 */
var ee = require('events').EventEmitter,
    ib;

try {
    ib = require('./build/Release/informix_bindings');
} catch(error) {
    console.log ('Could not load default informix_bindings');
    process.exit();
}

/*
 * @function extend(t, s) Extends the target class @c t with all the prototypes of
 * class @c s.
 * @param {Object} t target object
 * @param {Object} s source object
 */
function extend(t, s) {
    for (var k in s.prototype) {
        // console.log(k);
        t.prototype[k] = s.prototype[k];
    }
    return t;
}

/*
 * @private {BaseEventEmitter} bee base event emitter
 */
var bee = extend(function() {}, ee);
bee.prototype.emit = function() {
    /*
    if (arguments && arguments.length > 0) {
        for (var i = 0; i < arguments.length; ++i) {
            console.log("Argument[" + i + "]");
            console.log(arguments[i]);
        }
    }
    */
    var type = arguments[0];

    if (type === 'success') {
        console.log("Success:");
        console.log(arguments);
        var rs = arguments[1];

        /*
        for (var c = 0; c < rs.length; ++c) {
            // console.log(rs[c]);
            var r = rs[c];
            for (var col in r) {
                console.log(col + ' = ' + r[col]);
            }
        }
        */
    }
    else if (type === 'error'
            && (!this._events
                || !this._events.error
                || (Array.isArray(this._events.error)
                    && !this._events.error.length)
               )
       )
    {
        console.log (type + ': ' + arguments[1]);

        // Silently allow unattached error events
        return;
    }

    return ee.prototype.emit.apply(this, arguments);
}

exports.Query = extend(ib.Query, bee);
exports.Informix = extend(ib.Informix, bee);

/*
console.log('Query: ');
console.log(ib.Query);
console.log("\n" + 'Informix: ');
console.log(ib.Informix);

if (ib.isConnected()) {
    console.log('Connected');
}
*/
