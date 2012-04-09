
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
        t.prototype[k] = s.prototype[k];
    }
    return t;
}

/*
 * @private {BaseEventEmitter} bee base event emitter
 */
var bee = extend(function() {}, ee);

exports.Query = extend(ib.Query, bee);
exports.Informix = extend(ib.Informix, bee);
