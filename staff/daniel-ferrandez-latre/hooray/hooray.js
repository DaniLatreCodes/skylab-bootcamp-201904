'use strict';

/**
 * 
 */
function Hooray() {
    var first = arguments[0];

    if (arguments.length === 1 && typeof first === 'number')
        if (parseInt(first) !== first) throw RangeError('Invalid hooray');
        else return this.length = first;

    for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
    this.length = arguments.length;
}

/**
* Adds a value at the end of an hooray, incrementing its length by 1.
* 
* @param {*} value The value to push in the hooray.
* 
* @returns {number} The length of the hooray after adding the new value.
*/
Hooray.prototype.push = function (value) {
    if (arguments.length > 0)
        for (var i = 0; i < arguments.length; i++)
            this[this.length++] = arguments[i];

    return this.length;
}

/**
 * Iterates the current hooray and evaluates an expression on each of its values.
 * 
 * @param {Function} callback The expression to evaluate.
 */
Hooray.prototype.forEach = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var self = this;

    this.length && (function forEach(index) {
        callback(self[index], index);

        if (++index < self.length)
            forEach(index);
    })(0);
}

/**
 * @param {*} values The value to push in the hooray.
 * 
 * @returns {hooray} Returns a new hooray with all parameters passed within it.
 * 
 */

Hooray.prototype.concat = function () {
    var hooray = new Hooray();

    for(var i = 0; i < this.length; i++) {
        hooray.push(this[i]);
    }
    if(arguments.length > 0) {
        for(var i = 0; i < arguments.length; i++) {
            if(arguments[i] instanceof Hooray) {
                for(var j = 0; j < arguments[i].length; j++){
                    hooray.push(arguments[i][j]);
                }
            } else {
                hooray.push(arguments[i]);
            }
        }
    }
        return hooray;  
}

/**
 * Iterates the current hooray and evaluates an expression on each of its values to see 
 * whether are all equal or not.
 * 
 * @param {Function} callback The expression to evaluate.
 */

Hooray.prototype.every = function(callback) {

    if(arguments.length === 0) {
        throw TypeError(' undefined is not a callback.');
    } else if (typeof arguments[0] !== 'function') {
        throw new TypeError(arguments[0] + ' is not a callback.');
    }

    for(var i = 0; i < this.length; i++){
        if(!callback(this[i])) return false;
    }
    return true;
}

Hooray.prototype.indexOf = function() {



    var index = 0;
    if(arguments[1] > this.length) {
        return -1;
    }else if(arguments[1] < 0) {
        if(!((arguments[1] + this.length) < 0)) index = this.length + arguments[1];
    }
    for(var i = index; i < this.length; i++) {
        if(this[i] === arguments[0]) return i;
    }
    return -1;
}
