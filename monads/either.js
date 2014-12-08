var Left = exports.Left = function(value) {
	return new Either(value, null);
}

var Right = exports.Right = function(value) {
	return new Either(null, value);
}

var unwrap = exports.unwrap = function(either) {
	return either.isLeft() ? either.left : either.right;
}

function Either(left, right) {

	this.left = left;
	this.right = right;

	this.bind = function(fn) {
		// this allows us to "partially apply" functions without 
		// having to use Function.prototype.bind
		var args = Array.prototype.slice.call(arguments, 1);
		return this.isRight() ? Right(right) : fn.apply(null, args.concat(left));
	}

	this.isLeft = function() {
		return left !== null;
	}

	this.isRight = function() {
		return right !== null;
	}

}