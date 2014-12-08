var Just = exports.Just = function(value) {
	return new Maybe(value);
}

var Nothing = exports.Nothing = function() {
	return new Maybe(null);
}

exports.unwrap = function(maybe) {
	return maybe.value;
}

function Maybe(value) {

	this.value = value;

	this.bind = function(fn) {
		// this allows us to "partially apply" functions without 
		// having to use Function.prototype.bind
		var args = Array.prototype.slice.call(arguments, 1);
		return this.isNothing() ? Nothing() : fn.apply(null, args.concat(value));
	}

	this.isJust = function() {
		return value !== null;
	}

	this.isNothing = function() {
		return value === null;
	}

}